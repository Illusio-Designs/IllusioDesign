import React from 'react';
import '../styles/components/Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-top">
        <nav className="header-nav">
          <a className="active" href="#">Design Studio</a>
          <a href="#">Career Opportunities</a>
        </nav>
        <div className="header-contact">
          <span className="contact-item"><span role="img" aria-label="in-flag">🇮🇳</span>+91 76000 46416</span>
          <span className="contact-item"><span role="img" aria-label="mail">✉️</span>Info@illusiodesigns.agency</span>
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-logo">
          <img src={logo} alt="Illusio Designs Logo" />
        </div>
        <nav className="header-menu">
          <div className="dropdown">
            <a href="#">Services <span>▼</span></a>
          </div>
          <a href="#">Case Studies</a>
          <a href="#">Blogs</a>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </nav>
        <button className="engage-btn">Let's Engage</button>
      </div>
    </header>
  );
};

export default Header; 