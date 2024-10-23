import axios from 'axios';
import { API_URL } from "../config";

// Obtener todas las propiedades
export const getPropertiesRequest = async () => {
  return await axios.get(API_URL);
};

// Crear una propiedad
export const createPropertyRequest = async (property) => {
  const formData = new FormData();
  
  Object.keys(property).forEach(key => {
    if (Array.isArray(property[key])) {
      property[key].forEach(item => formData.append(key, item));
    } else if (key === 'images') {
      property[key].forEach(image => formData.append('images', image));
    } else {
      formData.append(key, property[key]);
    }
  });

  return await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Obtener una propiedad por ID
export const getPropertyRequest = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// Actualizar una propiedad
export const updatePropertyRequest = async (id, updatedProperty) => {
  return await axios.put(`${API_URL}/${id}`, updatedProperty);
};

// Eliminar una propiedad
export const deletePropertyRequest = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
