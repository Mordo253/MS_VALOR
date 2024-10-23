import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';

export const SearchbarC = ({ setSearchTerm }) => {
  return (
    <div className='flexBetween pl-6 h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-slate-500/5'>
      <input
        type="text"
        placeholder='Ingrese nombre, ciudad o precio'
        className='bg-transparent border-none outline-none w-full'
        onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
      />
      <FaLocationDot className='relative right-10 text-xl hover:text-blue-400 cursor-pointer' />
    </div>
  );
};