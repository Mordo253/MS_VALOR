import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import video from "../../../assets/casa.mp4";
import video1 from "../../../assets/video1.mp4";
import video2 from "../../../assets/videoC.mp4";
import "./Service.css"

export const Service = () => {
  const words = ["SERVICIOS", "INMUEBLES", "VEHÍCULOS"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Inicia el fade-out antes de cambiar la palabra
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFade(true); // Inicia el fade-in después del cambio
      }, 500); // Tiempo del fade-out antes de cambiar
    }, 10010); // Cambia cada 10 segundos

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="py-4 bg-gray-100">
      <div className="bg-gray-200 flex items-center justify-center py-10">
        <h2 className="text-4xl md:text-5xl font-bold text-black text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            DESCUBRE UNA
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            AMPLIA VARIEDAD DE
          </span>{" "}
          <span
            className={`transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            } text-primary font-extrabold underline decoration-wavy decoration-blue-500`}
          >
            {words[currentWordIndex]}
          </span>
        </h2>
      </div>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 10000 }}
          modules={[Autoplay]}
          className="w-full"
        >
          {/* Banner 1 */}
          <SwiperSlide>
            <div className="relative w-full h-[400px] sm:h-[500px] bg-gradient-to-r from-black to-gray-500 p-4 sm:p-8 rounded-lg shadow-lg overflow-hidden">
              {/* Video como fondo */}
              <video
                src={video1}
                muted
                autoPlay
                loop
                type="video/mp4"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              ></video>

              {/* Overlay para oscurecer el video si lo deseas */}
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>

              {/* Contenido superpuesto */}
              <div className="relative z-20 h-full flex flex-col justify-center space-y-2 sm:space-y-6">
                <h1 className="text-2xl sm:text-4xl font-bold text-white text-center">
                  ASESORIA<span className=" text-2xl sm:text-4xl font-bold text-white mt-1 sm:mt-2"> EN CREDITOS</span>
                </h1>
                <p className="text-white text-sm sm:text-lg text-center">
                  Credito Hipotecario
                  <br />
                  Crédito por libranza
                  <br />
                  Crédito de Consumo
                  <br />
                  Crédito Vehículo
                </p>

                <div className="flex justify-center">
                  <a href="https://wa.me/573160420188?text=Hola MS DE VALOR. 👋" target='_blank'>
                    <button className="bg-gray-900 text-white px-3 py-1 sm:px-6 sm:py-2 rounded-full text-xs sm:text-base">
                      VER MÁS
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Banner 2 */}
          <SwiperSlide>
            <div className="relative w-full h-[400px] sm:h-[500px] bg-gradient-to-r from-black to-gray-500 p-4 sm:p-8 rounded-lg shadow-lg overflow-hidden">
              {/* Video como fondo */}
              <video
                src={video}
                muted
                autoPlay
                loop
                type="video/mp4"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              ></video>

              {/* Overlay para oscurecer el video si lo deseas */}
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>

              {/* Contenido superpuesto */}
              <div className="relative z-20 h-full flex flex-col justify-center space-y-2 sm:space-y-6">
                <h1 className="text-2xl sm:text-4xl font-bold text-white text-center">
                  ASESORIA
                  <span className="block text-xl sm:text-2xl text-white mt-1 sm:mt-2">INMOBILIARIA</span>
                </h1>
                <p className="text-white text-sm sm:text-lg text-center">
                  Venta de propiedad raiz
                </p>

                <div className="flex justify-center">
                  <Link to="/properties-list">
                    <button className="bg-gray-900 text-white px-3 py-1 sm:px-6 sm:py-2 rounded-full text-xs sm:text-base">
                      VER MÁS
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* TERCER SLIDER */}
          <SwiperSlide>
            <div className="relative w-full h-[400px] sm:h-[500px] bg-gradient-to-r from-black to-gray-500 p-4 sm:p-8 rounded-lg shadow-lg overflow-hidden">
              {/* Video como fondo */}
              <video
                src={video2}
                muted
                autoPlay
                loop
                type="video/mp4"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              ></video>

              {/* Overlay para oscurecer el video si lo deseas */}
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>

              {/* Contenido superpuesto */}
              <div className="relative z-20 h-full flex flex-col justify-center space-y-2 sm:space-y-6">
                <h1 className="text-2xl sm:text-4xl font-bold text-white text-center">
                Encuentra con MS De Valor
                  <span className="block text-xl sm:text-2xl text-white mt-1 sm:mt-2">el vehículo de tus Sueños</span>
                </h1>
                <div className="flex justify-center">
                  <Link to="/cars-list">
                    <button className="bg-gray-900 text-white px-3 py-1 sm:px-6 sm:py-2 rounded-full text-xs sm:text-base">
                      VER MÁS
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};