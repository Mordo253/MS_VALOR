import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useVehicles } from '../../context/CarContext'; // Asegúrate de tener este contexto
import { Button } from "@material-tailwind/react";
import { ArrowLeft, Car, DollarSign, Ruler, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon, EmailIcon } from 'react-share';

const CarDetail = ({ icon, label, value }) => (
  <div className="flex items-center gap-1">
    {React.cloneElement(icon, { size: 16 })}
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  </div>
);

const ShareButton = ({ component: ShareButtonComponent, icon: IconComponent, color }) => (
  <ShareButtonComponent url={window.location.href}>
    <div className="p-1 rounded-full" style={{ backgroundColor: color }}>
      <IconComponent size={18} round bgStyle={{ fill: 'transparent' }} iconFillColor="white" />
    </div>
  </ShareButtonComponent>
);

export function CarDetails() {
  const { id } = useParams();
  const { getVehicle } = useVehicles(); // Función para obtener el vehículo
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [userSelected, setUserSelected] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const vehicleData = await getVehicle(id); // Obtiene el vehículo
        setVehicle(vehicleData.data);
      } catch (error) {
        setError('Error al cargar el vehículo.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id, getVehicle]);

  useEffect(() => {
    let interval;
    if (vehicle && vehicle.images.length > 1 && !userSelected) {
      interval = setInterval(() => {
        setMainImageIndex((prevIndex) => 
          prevIndex === vehicle.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [vehicle, userSelected]);

  const handleImageClick = (index) => {
    setMainImageIndex(index);
    setUserSelected(true);
    setTimeout(() => setUserSelected(false), 40000);
  };

  const changeMainImage = (direction) => {
    setMainImageIndex((prevIndex) => {
      if (direction === 'left') {
        return prevIndex === 0 ? vehicle.images.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === vehicle.images.length - 1 ? 0 : prevIndex + 1;
      }
    });
    setUserSelected(true);
    setTimeout(() => setUserSelected(false), 40000);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Cargando vehículo...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!vehicle) return <div className="text-center">No se encontró el vehículo.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative top-24">
      <Button onClick={() => window.history.back()} className="mb-3 flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 py-1 px-3 text-sm">
        <ArrowLeft size={16} />
        Volver
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Columna izquierda */}
        <div className="lg:col-span-3">
          <div className="flex justify-center items-center bg-white rounded-lg shadow-lg overflow-hidden" style={{height: '24rem'}}>
            <div className="image-container relative w-full h-full overflow-hidden rounded-t-[1rem] border-2 border-white/12">
              <img 
                src={vehicle.images[mainImageIndex]?.secure_url || "https://via.placeholder.com/800x600"}
                alt={vehicle.car} 
                className="w-full h-full object-contain"
              />
              <button onClick={() => changeMainImage('left')} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md z-10">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => changeMainImage('right')} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md z-10">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="mt-2 flex space-x-1 overflow-x-auto">
            {vehicle.images.map((image, index) => (
              <div key={index} className="w-10 h-10 flex-shrink-0">
                <img 
                  src={image.secure_url} 
                  alt={`${vehicle.car} - ${index + 1}`} 
                  className={`w-full h-full object-cover cursor-pointer rounded-md ${index === mainImageIndex ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleImageClick(index)}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Columna derecha */}
        <div className="lg:col-span-2 flex flex-col justify-between h-full p-3 bg-white rounded-lg shadow">
          <div>
            <h1 className="text-xl font-bold mb-2">{vehicle.car}</h1>
            <div className="text-2xl font-bold mb-3 flex items-center text-blue-600">
              <DollarSign size={22} />
              <span>{vehicle.price.toLocaleString()}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <CarDetail icon={<Car />} label="Modelo" value={vehicle.model} />
              <CarDetail icon={<Star />} label="Tipo de tracción" value={vehicle.tractionType} />
              <CarDetail icon={<Ruler />} label="Kilómetros" value={`${vehicle.kilometer} km`} />
              {/* Agregar más detalles si es necesario */}
            </div>
          </div>
          
          <div>
            <a>
              <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 mb-2 py-1.5 text-sm font-semibold rounded-lg transition duration-300">
                Contactar al vendedor
              </Button>
            </a>
            <a 
              href={`https://wa.me/573160420188?text=Hola MS DE VALOR. 👋, estoy interesado por el vehículo ${vehicle.model} - ${vehicle.brand}-${vehicle.car}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="w-full bg-green-500 text-white hover:bg-green-600 mb-2 py-1.5 text-sm font-semibold rounded-lg transition duration-300">
                Contactar por WhatsApp
              </button>
            </a>
            <div className="flex justify-center space-x-3">
              <ShareButton component={FacebookShareButton} icon={FacebookIcon} color="#1877F2" />
              <ShareButton component={TwitterShareButton} icon={TwitterIcon} color="#1DA1F2" />
              <ShareButton component={WhatsappShareButton} icon={WhatsappIcon} color="#25D366" />
              <ShareButton component={EmailShareButton} icon={EmailIcon} color="#D44638" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Descripción */}
      <div className="mt-16 bg-white p-3 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Descripción</h2>
        <p className="text-sm text-gray-700">{vehicle.description}</p>
      </div>
    </div>
  );
}
