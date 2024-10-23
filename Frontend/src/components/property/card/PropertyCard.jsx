import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import { DollarSign, Bed, Bath, Square } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useProperties } from '../../../context/PropertyContex';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import custom CSS
import './Card.css';

export const PropertyCard = () => {
  const { properties, loading, error, getAllProperties } = useProperties();
  const navigate = useNavigate();

  useEffect(() => {
    getAllProperties();
  }, [getAllProperties]);

  if (loading) {
    return <div className="text-center text-xl text-gray-600 p-8">Cargando propiedades...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-600 p-8">
        <p>{error}</p>
        <button 
          onClick={getAllProperties}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <section className="property-card-section">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">TU MEJOR ELECCIÓN</span>
          <h2 className="title">PROPIEDADES RECIÉN AGREGADAS</h2>
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
          {properties.map((property) => (
            <SwiperSlide key={property._id}>
              <article className="card" onClick={() => navigate(`/properties/${property._id}`)}>
                <img 
                  className="card__background"
                  src={property.images && property.images.length > 0 ? property.images[0].secure_url : "/api/placeholder/300/200"}
                  alt={property.title}
                  width="300"
                  height="200"
                />
                <div className="card__content">
                  <div className="card__content--container">
                    <h2 className="card__title">{property.tipoInmueble} - {property.ciudad} - {property.zona}</h2>
                    <p className="card__description">
                      <DollarSign size={16} />
                      <span>{property.costo ? property.costo.toLocaleString() : 'Precio no disponible'}</span>
                    </p>
                    <div className="card__details">
                      <span><Bed size={16} /> {property.alcobas}</span>
                      <span><Bath size={16} /> {property.banos}</span>
                      <span><Square size={16} /> {property.areaConstruida} m²</span>
                    </div>
                  </div>
                  <button className="card__button">Ver más</button>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link to="/properties-list" className="btn-ver-todas">
          Ver todas las propiedades
        </Link>
      </div>
    </section>
  );
}

export default PropertyCard;