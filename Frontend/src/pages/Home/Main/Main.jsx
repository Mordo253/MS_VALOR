import { Link } from 'react-router-dom'
import imgF from '../../../assets/youngF.png'
import { FaHouseChimney } from "react-icons/fa6";
import { motion } from 'framer-motion';
import "./HeroH.css";

export const HeroH = () => {
  return (
    <section className='hero bg-gray-300 py-6 xl:pt-8 xl:pb-0 overflow-hidden'>
      <div className="container mx-auto h-full relative top-[-5rem]">
        <div className='flex flex-col xl:flex-row items-center justify-between h-full'>
          
          <motion.div 
            className='hero__text xl:w-[48%] text-center xl:text-left relative'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className='flex items-center bg-white py-[10px] px-[20px] w-max gap-x-2 mb-[26px] rounded-full mx-auto xl:mx-0'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <FaHouseChimney className='text-2xl text-black' />
              <div className="uppercase text-base font-medium text-[#9ab4b7] tracking-[2.24px]">
                SUEÑOS DE VALOR
              </div>
            </motion.div>

            {/* Círculos azules animados */}
            <motion.div className="blue-circle" 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 0.7 }} 
            />
            <motion.div className="blue1-circle" 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 0.9 }} 
            />
            <motion.div className="blue3-circle" 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 1.1 }} 
            />
            <motion.div className="blue4-circle" 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 1.3 }} 
            />
            <motion.div className="blue5-circle" 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 1.5 }} 
            />

            <motion.h2 
              className='uppercase text-[1rem] xl:text-[2.5rem] font-semibold mb-6'
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Ayudamos en la materialización de sueños a nuestros clientes
            </motion.h2>

            <motion.p 
              className='mb-[42px] md:max-w-xl text-neutral-700'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            >
              Acompañamiento de principio a fin en todo el proceso de solicitud crediticia
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <a href="https://wa.me/573160420188?text=Hola MS DE VALOR. 👋" target='_blank'>
                <button className='btn btn-lg btn-accent mx-auto xl:mx-0'>ESCRIBENOS</button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className='hero__img hidden xl:flex max-w-[45%] self-end'
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <img src={imgF} alt="family MS" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
