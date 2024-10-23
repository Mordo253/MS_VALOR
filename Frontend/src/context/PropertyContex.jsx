import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const PropertyContext = createContext();

export const useProperties = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]); // Estado para propiedades filtradas
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las propiedades
  const getAllProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await axios.get(`${API_URL}/property/all-properties`);
      if (response.data && Array.isArray(response.data.data)) {
        setProperties(response.data.data);
        setFilteredProperties(response.data.data); // Asignar también a las propiedades filtradas
      } else {
        setProperties([]);
        setFilteredProperties([]);
      }
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
      setError('Error al cargar las propiedades. Por favor, intenta de nuevo.');
      setProperties([]);
      setFilteredProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtrar propiedades en función de los filtros proporcionados
  const filterProperties = (filters) => {
    let filtered = properties;

    // Filtrar por zona
    if (filters.zona) {
      filtered = filtered.filter((property) => property.zona === filters.zona);
    }

    // Filtrar por tipo de inmueble
    if (filters.tipoInmueble) {
      filtered = filtered.filter((property) => property.tipoInmueble === filters.tipoInmueble);
    }

    // Filtrar por costo
    if (filters.costo) {
      filtered = filtered.filter((property) => property.costo <= parseInt(filters.costo, 10));
    }

    // Filtrar por alcobas y baños
    if (filters.alcobas) {
      filtered = filtered.filter((property) => property.alcobas === parseInt(filters.alcobas, 10));
    }
    if (filters.banos) {
      filtered = filtered.filter((property) => property.banos === parseInt(filters.banos, 10));
    }

    setFilteredProperties(filtered); // Actualizar las propiedades filtradas
  };

  const createProperty = async (propertyData) => {
    try {
      const response = await axios.post(`${API_URL}/property/properties`, propertyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProperties([...properties, response.data]);
      setFilteredProperties([...properties, response.data]); // Actualizar también el estado filtrado
      return response.data;
    } catch (error) {
      console.error('Error al crear propiedad:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const getProperty = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/property/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener propiedad:', error);
      throw error;
    }
  };

  const updateProperty = async (id, propertyData) => {
    try {
      const response = await axios.put(`${API_URL}/property/properties/${id}`, propertyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProperties(properties.map(p => p._id === id ? response.data : p));
      setFilteredProperties(properties.map(p => p._id === id ? response.data : p)); // Actualizar también el estado filtrado
      return response.data;
    } catch (error) {
      console.error('Error al actualizar propiedad:', error);
      throw error;
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`${API_URL}/property/properties/${id}`);
      setProperties(properties.filter(p => p._id !== id));
      setFilteredProperties(properties.filter(p => p._id !== id)); // Actualizar también el estado filtrado
    } catch (error) {
      console.error('Error al eliminar propiedad:', error);
      throw error;
    }
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      filteredProperties,
      loading,
      error,
      getAllProperties,
      filterProperties, // Incluir la función de filtrado en el contexto
      createProperty,
      getProperty,
      updateProperty,
      deleteProperty,
    }}>
      {children}
    </PropertyContext.Provider>
  );
};