import mongoose from 'mongoose'; 
import Property from '../models/property.model.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.js';
import fs from 'fs-extra';

export const createProperty = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newProperty = new Property(req.body);

    if (req.files?.images) {
      const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      
      for (const image of images) { 
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.mimetype)) {
          throw new Error('Tipo de archivo no permitido');
        }

        const result = await uploadImage(image.tempFilePath, {
          folder: 'properties',
          transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
        });

        newProperty.images.push({
          public_id: result.public_id,
          secure_url: result.secure_url,
          width: result.width,
          height: result.height,
          format: result.format,
          resource_type: result.resource_type
        });

        await fs.unlink(image.tempFilePath);
      }
    }

    const savedProperty = await newProperty.save({ session });
    await session.commitTransaction();
    res.status(201).json({ success: true, data: savedProperty });
  } catch (error) {
    await session.abortTransaction();
    console.error('Error en createProperty:', error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    session.endSession();
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error('Error en getAllProperties:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'ID de propiedad inválido' });
    }
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Propiedad no encontrada' });
    }
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error('Error en getPropertyById:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProperty= async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    console.log('ID recibido:', id);
    console.log('Datos recibidos (body):', req.body);
    console.log('Datos recibidos (query):', req.query);
    console.log('Archivos recibidos:', req.files);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'ID de propiedad inválido' });
    }

    let property = await Property.findById(id).session(session);
    if (!property) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: 'Propiedad no encontrada' });
    }

    // Combinar datos de body y query
    const updateData = { ...req.query, ...req.body };
    console.log('Datos combinados para actualización:', updateData);

    // Verificar si se recibieron datos para actualizar
    if (Object.keys(updateData).length === 0 && !req.files) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: 'No se recibieron datos para actualizar' });
    }

    // Actualizar campos de texto (sin restricción para campos no existentes)
    Object.keys(updateData).forEach(key => {
      if (key !== 'images') {
        console.log(`Actualizando campo ${key} de ${property[key]} a ${updateData[key]}`);
        property[key] = updateData[key];
      }
    });

    // Comentar temporalmente la actualización de imágenes
    // Descomentar esta sección si el resto del código funciona correctamente

  
    if (req.files?.images) {
      const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      console.log('Número de imágenes a procesar:', images.length);
      
      if (property.images.length + images.length > property.imageLimit) {
        await session.abortTransaction();
        return res.status(400).json({ success: false, message: 'Excede el límite de imágenes permitido' });
      }

      for (const image of images) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.mimetype)) {
          await session.abortTransaction();
          return res.status(400).json({ success: false, message: 'Tipo de archivo no permitido' });
        }

        try {
          const result = await uploadImage(image.tempFilePath, {
            folder: 'properties',
            transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
          });

          property.images.push({
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            resource_type: result.resource_type
          });

          await fs.unlink(image.tempFilePath);
        } catch (uploadError) {
          await session.abortTransaction();
          console.error('Error al cargar la imagen:', uploadError);
          return res.status(500).json({ success: false, message: 'Error al cargar la imagen', error: uploadError.message });
        }
      }
    }
    

    // Guardar los cambios
    console.log('Propiedad antes de guardar:', property);
    const updatedProperty = await property.save({ session });
    console.log('Propiedad después de guardar:', updatedProperty);

    await session.commitTransaction();
    res.status(200).json({ success: true, data: updatedProperty });
  } catch (error) {
    await session.abortTransaction();
    console.error('Error en updateProperty:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Error de validación', errors: error.errors });
    }
    res.status(500).json({ success: false, message: 'Error al actualizar la propiedad', error: error.message });
  } finally {
    session.endSession();
  }
};

export const deleteProperty = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('ID de propiedad inválido');
    }

    const property = await Property.findById(id).session(session);
    if (!property) {
      throw new Error('Propiedad no encontrada');
    }

    // Eliminar imágenes de Cloudinary
    for (const image of property.images) {
      await deleteImage(image.public_id);
    }

    await Property.findByIdAndDelete(id).session(session);
    await session.commitTransaction();
    res.status(200).json({ success: true, message: 'Propiedad eliminada correctamente' });
  } catch (error) {
    await session.abortTransaction();
    console.error('Error en deleteProperty:', error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    session.endSession();
  }
};