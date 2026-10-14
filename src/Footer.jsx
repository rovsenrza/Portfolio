import { RiFacebookFill } from "react-icons/ri";
import { FaInstagram, FaLinkedinIn, FaGithub, FaWhatsapp, FaRegEnvelope, FaPhoneAlt } from "react-icons/fa";
import { contact } from "./data";

function Footer() {
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer_inner">
          <div className="footer_right">
            <h3 data-reveal>Get in touch</h3>
            <p>
              Looking for an iOS engineer, or need a fast, polished website? I build native apps in Swift and web
              interfaces in React. Tell me about your project and let’s see how I can help.
            </p>
            <ul>
              <li><a href={contact.linkedin} aria-label="LinkedIn"><FaLinkedinIn /></a></li>
              <li><a href={contact.github} aria-label="GitHub"><FaGithub /></a></li>
              <li><a href={contact.whatsapp} aria-label="WhatsApp"><FaWhatsapp /></a></li>
              <li><a href={contact.instagram} aria-label="Instagram"><FaInstagram /></a></li>
              <li><a href={contact.facebook} aria-label="Facebook"><RiFacebookFill /></a></li>
            </ul>
          </div>
          <div className="footer_left">
            <a className="contact_card" href={`mailto:${contact.email}`}>
              <span className="contact_icon" aria-hidden="true"><FaRegEnvelope /></span>
              <span className="contact_link">{contact.email.split("@")[0]}<wbr />@{contact.email.split("@")[1]}</span>
            </a>
            <a className="contact_card" href={contact.phoneHref}>
              <span className="contact_icon" aria-hidden="true"><FaPhoneAlt /></span>
              <span className="contact_link">{contact.phone}</span>
            </a>
          </div>
        </div>
        <div className="copyright">
          <span>© {new Date().getFullYear()} Rovshan Rzayev</span>
          <button type="button" className="term_footer" onClick={() => window.dispatchEvent(new Event("open-terminal"))}>
            &gt;_ open the terminal
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
