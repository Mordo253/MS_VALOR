import { useEffect } from 'react';
import './home.css'   
import video from "../../../assets/video1.mp4";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Aos from'aos';
import  "aos/dist/aos.css";

const Home = () => {

  useEffect(()=>{
    Aos.init({duration:2000})
  },[])

  return (
    <section className="home">
     <div className="overlay"></div> 
     <video src={video} muted autoPlay loop type="video/mp4"></video>
     
     <div className="homeContent container">
        <div className="textDiv">

          <h1 data-aos="fade-up" className="homeTitle">
            ¡MATERIALIZAMOS TUS SUEÑOS DE VALOR!
          </h1>

          <span data-aos="fade-up" className="smallText">
            Porque todos merecemos cosas únicas
          </span>
        </div>
        {/* <div data-aos="fade-up" className="btnDiv"> 
          <button className="btn">
              <Link  to="/login">LOG IN</Link>
          </button>
        </div> */}
        {/* <div data-aos="fade-up" className="cardDiv">
          visualizar min 42:26 - 50:00
        </div> */}
        
        <div data-aos="fade-up" className="homeFooterIcons flex">
          <div className="rightIcons flex">
            <Link to="https://www.facebook.com/MSdeValor/" target='_blank'>
              <FiFacebook className='icons'/>
            </Link>
            <Link to="https://www.instagram.com/msdevalor/" target='_blank'>
              <FaInstagram className='icons'/>
            </Link>
            <Link to="/">
              <FaWhatsapp className='icons'/>
            </Link>
          
          </div>
        </div>
     </div>
    </section>
  )
}

export default Home