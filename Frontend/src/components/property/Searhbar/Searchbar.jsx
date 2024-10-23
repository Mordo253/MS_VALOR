import React, { useState } from 'react';

export const Searchbar = ({ setSearchTerm, setFilters, tiposInmueble, minPrice, maxPrice }) => {
  const [localFilters, setLocalFilters] = useState({
    tipoInmueble: '',
    precioMin: '',
    precioMax: '',
    alcobas: '',
    banos: '',
  });

  const predefinedPriceRanges = [
    { min: 0, max: 100000000, label: 'Hasta $100.000.000' },
    { min: 100000001, max: 300000000, label: '$100.000.000 - $300.000.000' },
    { min: 300000001, max: 500000000, label: '$300.000.000 - $500.000.000' },
    { min: 500000001, max: maxPrice, label: `Más de $500.000.000` },
  ];

  const [showCustomPrice, setShowCustomPrice] = useState(false);

  const formatPrice = (value) => {
    if (!value) return '';
    const numberValue = String(value).replace(/\D/g, ''); // Eliminamos cualquier cosa que no sea un número
    return new Intl.NumberFormat('de-DE').format(numberValue); // Formateamos con puntos
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value,
    });
  };

  const handleCustomPriceChange = (e) => {
    const { name, value } = e.target;
    const rawValue = value.replace(/\D/g, ''); // Eliminamos cualquier carácter no numérico para guardar solo los números

    setLocalFilters({
      ...localFilters,
      [name]: rawValue, // Guardamos el valor sin formatear en el estado
    });
  };

  const applyFilters = () => {
    const filtersToApply = {
      ...localFilters,
      precioMin: localFilters.precioMin ? parseInt(localFilters.precioMin) : '',
      precioMax: localFilters.precioMax ? parseInt(localFilters.precioMax) : '',
    };
    setFilters(filtersToApply);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const selectedRange = e.target.value;

    if (selectedRange === 'custom') {
      setShowCustomPrice(true);
    } else {
      setShowCustomPrice(false);
      const [min, max] = selectedRange.split('-');
      setLocalFilters({
        ...localFilters,
        precioMin: min,
        precioMax: max,
      });
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <input
          type="text"
          className="p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 ease-in-out flex-grow"
          placeholder="Buscar propiedades..."
          onChange={handleInputChange}
        />

        <select
          name="tipoInmueble"
          value={localFilters.tipoInmueble}
          onChange={handleFilterChange}
          className="p-3 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 ease-in-out"
        >
          <option value="">Tipo de Inmueble</option>
          {tiposInmueble.map((tipo, index) => (
            <option key={index} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>

        <select
          className="p-3 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 ease-in-out"
          onChange={handlePriceRangeChange}
        >
          <option value="">Selecciona un rango de precios</option>
          {predefinedPriceRanges.map((range, index) => (
            <option key={index} value={`${range.min}-${range.max}`}>
              {range.label}
            </option>
          ))}
          <option value="custom">Personalizado</option>
        </select>
      </div>

      {showCustomPrice && (
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-grow">
            <input
              type="text"
              name="precioMin"
              value={formatPrice(localFilters.precioMin)} // Mostramos el precio formateado
              onChange={handleCustomPriceChange} // Guardamos el valor sin formatear en el estado
              className="p-3 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 ease-in-out w-full"
              placeholder={`Precio Mínimo (${formatPrice(minPrice)})`}
            />
          </div>
          <div className="flex-grow">
            <input
              type="text"
              name="precioMax"
              value={formatPrice(localFilters.precioMax)} // Mostramos el precio formateado
              onChange={handleCustomPriceChange} // Guardamos el valor sin formatear en el estado
              className="p-3 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 ease-in-out w-full"
              placeholder={`Precio Máximo (${formatPrice(maxPrice)})`}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-grow">
          <input
            type="number"
            name="alcobas"
            value={localFilters.alcobas}
            onChange={handleFilterChange}
            className="p-3 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 ease-in-out w-full"
            placeholder="Alcobas"
            min="0"
          />
        </div>
        <div className="flex-grow">
          <input
            type="number"
            name="banos"
            value={localFilters.banos}
            onChange={handleFilterChange}
            className="p-3 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 ease-in-out w-full"
            placeholder="Baños"
            min="0"
          />
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="bg-indigo-500 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out w-full"
      >
        Aplicar filtros
      </button>
    </div>
  );
};
