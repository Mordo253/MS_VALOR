import "../style.css";
import "./hero.css";
import imgh from '../../../assets/heroproperty.jpg'
import React from 'react'
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";

export const PropertyHero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">

        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orenge-circle"></div>
            <h1>
              Encuentra 
              <br/>
              La vivienda <br/> De tus sueños
            </h1>
          </div>

          <div className="flexColStart hero-des">
            <span>Disfruta de una gran variedad de propiedades a tu medida</span>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing</span>
          </div>

          <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25}/>
            <input type="text" />
            <button className="btn">Search</button>
          </div>

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={9000} duration={4}/>
              <span>+</span>
              </span>
              <span>Clientes Satisfechos</span>
              
            </div>
          </div>
        </div>
        
        
        <div className="flexCenter hero-right">
          <div className="image-container">
            <img src={imgh} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
