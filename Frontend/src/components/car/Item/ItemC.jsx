import React from 'react';
import { MdOutlineBathtub, MdOutlineBed } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const ItemC = (vehicle) => {
  return (
    <div className="rounded-2xl p-5 bg-white shadow-lg relative">
      {/* Imagen con ícono de favorito */}
      <div className="pb-2 relative rounded-t-2xl overflow-hidden">
        <img
          src={vehicle.images && vehicle.images.length > 0 ? vehicle.images[0].secure_url : "/api/placeholder/300/200"}
          alt={vehicle.vehicle}
          className="rounded-xl object-cover w-full h-56"
        />
      </div>

      {/* Información del vehículo */}
      <h5 className="text-green-500 font-semibold">{`${vehicle.registrationYear}, ${vehicle.tractionType}, ${vehicle.model}, ${vehicle.brand}` || "Modelo no disponible"}</h5>
      <h4 className="font-bold text-lg my-1">{vehicle.brand}-{vehicle.model}-{vehicle.car} </h4>
      <p className="text-sm text-gray-500 line-clamp-2 mb-2">{vehicle.description}</p>

      {/* Detalles (habitaciones, baños, garajes, área) */}
      <div className="flex gap-x-2 py-2">
        <div className="flex items-center gap-x-1 border-r border-gray-300 pr-3">
          <MdOutlineBed /> {vehicle.kilometer}
        </div>
        <div className="flex items-center gap-x-1 border-r border-gray-300 pr-3">
          <MdOutlineBathtub /> {vehicle.change}
        </div>
      </div>

      {/* Precio y botón */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold">{vehicle.price ? `$${vehicle.price.toLocaleString()}` : 'Precio no disponible'}</span>
        <Link to={`/cars/${vehicle._id}`}>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md">
            Ver detalles
          </button>
        </Link>
      </div>
    </div>
  );
};