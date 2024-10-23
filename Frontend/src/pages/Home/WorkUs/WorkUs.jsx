import React from 'react';
import bannerWU from '../../../assets/bannerWU.png';
import { LuBookmark } from "react-icons/lu";
export const WorkUs = () => {
  return (
    <section className="min-h-[80vh] bg-white py-16 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Contenido Izquierdo */}
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-navy-900">
              Trabaja Con Nosotros
            </h1>
            
            <p className="text-xl text-gray-700 max-w-lg">
              Si quieres tener ingresos extras, con comisiones sin tope y además manejar tu tiempo.
            </p> 
            
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg flex items-center gap-3 transition-colors">
                <LuBookmark />  
                <a href="https://forms.gle/xYUR5rkCETamEVyXA" target='_blank'>
                    Aplica Aquí
                </a>
              
            </button>
          </div>
          
          {/* Contenido Derecho */}
          <div className="lg:w-1/2 relative flex justify-center">
            <div className="relative w-full h-full max-w-lg">
              {/* Fondo amarillo ajustado con z-0 */}
              <div className="absolute z-0 right-0 top-0 w-60 h-60 bg-yellow-500 rounded-full opacity-50 translate-x-1/4 -translate-y-1/4" />
              <img
                src={bannerWU}
                alt="Professional woman in business attire"
                className="relative z-10 w-full h-96"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
