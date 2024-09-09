import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { RiFacebookFill  } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";


function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer_inner">
        <div className="footer_right">

        <h3>Get in touch</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi odio totam tempore error facere, repellendus veritatis accusamus tenetur eveniet eos?</p>
        <ul>
          <li><a href="https://www.facebook.com/profile.php?id=100091345232600"><RiFacebookFill /></a></li>
          <li><a href="https://www.instagram.com/rzayevv.o52/"><FaInstagram/></a></li>
          <li><a href="https://www.linkedin.com/in/r%C3%B6v%C5%9F%C9%99n-rzayev-978875236/"><FaLinkedinIn/></a></li>
          <li><a href="https://wa.me/+994507193149"><FaWhatsapp/></a></li>
        </ul>
        </div>
        <div className="footer_left">
          <div className="contact_card">
            <div className="contact_icon"><FaRegEnvelope /></div>
            <div className="contact_link"><a href="mailto:rovshan@div.edu.az">rovshan@div.edu.az</a></div>
          </div>
          <div className="contact_card">
            <div className="contact_icon"><FaPhoneAlt /></div>
            <div className="contact_link"><a href="tel:+994507193149">(+99450) 719 31 49</a></div>
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer