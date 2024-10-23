import bannerT from "../../../assets/bannerI.jpeg";
import { Link } from 'react-router-dom';
import { ToolsI } from '../../../components/HomeC/tools/ToolsI';

export const ToolsB = () => {

  return (
    <section className="w-full h-auto min-h-[300px] bg-indigo-900 rounded-lg overflow-hidden">
      <div className="w-full h-full flex flex-col lg:flex-row relative">
        {/* Sección Izquierda (Texto y Herramientas) */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 z-10 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            CONOCE NUESTRAS 
            <br />
            HERRAMIENTAS
          </h1>
          <ToolsI/>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-6">
            <Link 
              to="/tools"
              className="bg-white text-indigo-900 text-sm font-semibold py-2 px-4 rounded-full inline-block w-full sm:w-auto text-center"
            >
              Conocer más
            </Link>
          </div>
        </div>

        {/* Sección Derecha (Imagen de fondo) */}
        <div className="flex-1 relative min-h-[300px] lg:min-h-[500px]">
          <img 
            src={bannerT} 
            alt="Shopping online" 
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Superposición de Gradiente */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(49, 46, 129, 1), rgba(49, 46, 129, 0.6), transparent)',
            }}
          />
        </div>
      </div>

      {/* Modal para el Convertidor de Tasas de Interés */}
    </section>
  );
};