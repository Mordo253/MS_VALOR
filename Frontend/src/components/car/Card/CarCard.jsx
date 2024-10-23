import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import { DollarSign, Car, Calendar, Tag } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useVehicles } from '../../../context/CarContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import custom CSS
import './CardC.css';

export const CarCard = () => {
  const { vehicles, loading, error, getAllVehicles } = useVehicles();
  const navigate = useNavigate();

  useEffect(() => {
    getAllVehicles();
  }, [getAllVehicles]);

  if (loading) {
    return <div className="text-center text-xl text-gray-600 p-8">Cargando vehículos...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-600 p-8">
        <p>{error}</p>
        <button 
          onClick={getAllVehicles}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <section className="vehicle-card-section">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">OPCIONES MÁS RECIENTES</span>
          <h2 className="title">VEHÍCULOS AGREGADOS RECIENTEMENTE</h2>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {vehicles.map((vehicle) => (
            <SwiperSlide key={vehicle._id}>
              <article className="card" onClick={() => navigate(`/cars/${vehicle._id}`)}>
                <img 
                  className="card__background"
                  src={vehicle.images && vehicle.images.length > 0 ? vehicle.images[0].secure_url : "/api/placeholder/300/200"}
                  alt={vehicle.model}
                  width="300"
                  height="200"
                />
                <div className="card__content">
                  <div className="card__content--container">
                    <h2 className="card__title">{vehicle.model} - {vehicle.brand}</h2>
                    <p className="card__description">
                      <DollarSign size={16} />
                      <span>{vehicle.price ? vehicle.price.toLocaleString() : 'Precio no disponible'}</span>
                    </p>
                    <div className="card__details">
                      <span><Car size={16} /> {vehicle.car}</span>
                      <span><Calendar size={16} /> {vehicle.registrationYear}</span>
                      <span><Tag size={16} /> {vehicle.color}</span>
                    </div>
                  </div>
                  <button className="card__button">Ver más</button>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link to="/cars-list" className="btn-ver-todas">
          Ver todos los vehículos
        </Link>
      </div>
    </section>
  );
}

