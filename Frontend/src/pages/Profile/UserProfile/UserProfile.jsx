import React from 'react'
import { Link } from "react-router-dom";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import "./UserProfile.css";
export const UserProfile = () => {
  return (
    <section className="wapper">
         <div className="left">
            <img src="https://i.imgur.com/cMy8V5j.png" alt="user" width="100" />
            <h4>Alex William</h4>
            <p>UI Developer</p>
        </div>
        <div className="right">
            <div className="info">
            <h3>Information</h3>
                <div className="info_data">
                    <div className="data">
                    <h4>Email</h4>
                    <p>alex@gmail.com</p>
                    </div>
                    <div className="data">
                    <h4>Phone</h4>
                    <p>0001-213-998761</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="social_media">
            <Link to="https://www.facebook.com/MSdeValor/" target='_blank'>
              <FiFacebook className='fab fa-facebook-f'/>
            </Link>
            <Link to="https://www.instagram.com/msdevalor/" target='_blank'>
              <FaInstagram className='fab fa-instagram'/>
            </Link>
            {/* <Link to="/">
              <FaWhatsapp className='icons'/>
            </Link> */}
        </div>
    </section>
   
  )
}
