import React from 'react';
import "./footer2.css"
import logoM from '../../assets/MS5.png'
export const Footer = () => {

  return (
    <>
      <div className="footer">
        <div className="content">
          <div>
            <div>
              <b>Productos</b>
              <a href="#">Asesoria</a>
              <a href="#">Creditos</a>
            </div>
          </div>
          <div>
            <img src={logoM} alt="logo MS de valor" className='image'/>
            <p>MS DE VALOR ©2024 Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </>
  );
};