import React from 'react';
import { MdOutlineBathtub, MdOutlineBed, MdOutlineGarage, MdOutlineSquare } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai'; // Ícono de favorito (corazón)

export const Item = (property) => {
  return (
    <div className="rounded-2xl p-5 bg-white shadow-lg relative">
      {/* Imagen con ícono de favorito */}
      <div className="pb-2 relative rounded-t-2xl overflow-hidden">
        <img
          src={property.images && property.images.length > 0 ? property.images[0].secure_url : "/api/placeholder/300/200"}
          alt={property.title}
          className="rounded-xl object-cover w-full h-56"
        />
      </div>

      {/* Información de la propiedad */}
      <h5 className="text-green-500 font-semibold">{`${property.zona}, ${property.ciudad}, ${property.departamento}, ${property.pais}` || "Ubicación no disponible"}</h5>
      <h4 className="font-bold text-lg my-1">{property.tipoInmueble} - {property.ciudad} - {property.zona}</h4>
      <p className="text-sm text-gray-500 line-clamp-2 mb-2">{property.description}</p>

      {/* Detalles (habitaciones, baños, garajes, área) */}
      <div className="flex gap-x-2 py-2">
        <div className="flex items-center gap-x-1 border-r border-gray-300 pr-3">
          <MdOutlineBed /> {property.alcobas}
        </div>
        <div className="flex items-center gap-x-1 border-r border-gray-300 pr-3">
          <MdOutlineBathtub /> {property.banos}
        </div>
        <div className="flex items-center gap-x-1 border-r border-gray-300 pr-3">
          <MdOutlineGarage /> {property.garaje}
        </div>
        <div className="flex items-center gap-x-1">
          <MdOutlineSquare /> {property.areaTerreno} m²
        </div>
      </div>

      {/* Precio y botón */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold">{property.costo ? `$${property.costo.toLocaleString()}` : 'Precio no disponible'}</span>
        <Link to={`/properties/${property._id}`}>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md">
            Ver detalles
          </button>
        </Link>
      </div>
    </div>
  );
};