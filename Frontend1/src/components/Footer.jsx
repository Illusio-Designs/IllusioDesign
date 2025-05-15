import React from 'react';
import '../styles/components/Footer.css';
import logo from '../assets/Illusio Design Logo WHITE.png';
import { FaLinkedin, FaInstagram, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-collab">
          <div className="footer-collab-icon">🎧 <div>
            <h2>Looking to collaborate?<br/>Let's get in touch! <span className="footer-smile">🙂</span></h2>
          </div></div>
          
          <button className="footer-connect-btn" onClick={() => window.location.href = '/contact-us'}>Let&apos;s Connect</button>
        </div>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="logo" />
          </div>
          <p>Transforming ideas into impactful user experience for global enterprise. With a focus on innovation and excellence. We design solutions that enhance user engagement. Together we can shape the future of your business.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Services</h4>
            <div className="footer-links-list">
              <a href="/services/design">Design</a>
              <a href="/services/development">Development</a>
              <a href="/services/marketing">Marketing</a>
            </div>
          </div>
            <div>
              <h4>Resources</h4>
              <div className="footer-links-list">
                <a href="/case-studies">Case Studies</a>
                <a href="/blog">Blogs</a>
                <a href="/about-us">About Us</a>
                <a href="/contact-us">Contact Us</a>
            </div>
          </div>
          <div>
            <h4>Contact Us</h4>
            <div className="footer-contact-block">
              <div className='address'><span className="location-icon">📍</span> <address> 211 - 212, 2nd Floor, Runway Heights, Ayodhya chowk, 150ft Ring Road Rajkot, 360001	</address></div>
              <div><a href="tel:+917600046416">📞 +91 76000 46416</a></div>
              <div><a href="mailto:info@illusiodesigns.agency">✉️ Info@illusiodesigns.agency</a></div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-tags">
          <div className="footer-tags-list">
          <span>UI/UX Design Company</span> |
          <span>Web Design</span> |
          <span>Mobile App Design</span> |
          <span>Branding</span> |
          <span>Illustration</span>
          </div>
          <div className="footer-legal">
          <div>
          <span>Terms of Service</span> | <span> Privacy Policy</span>
          </div>
          <span>Copyright @ 2025 Illusio Designs. All rights reserved.</span>
        </div>
        </div>
        
        
        <div className="footer-social">
          <a href="https://www.linkedin.com/company/illusio-designs/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="social-icon" />
          </a>
          <a href="https://www.instagram.com/illusio_designs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://www.facebook.com/IllusioDesigns/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF className="social-icon" />
          </a>
        </div>
        </div>
    </footer>
  );
};

export default Footer; 