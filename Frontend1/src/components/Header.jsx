import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/Header.css';
import logo from '../assets/logo black.png';
import animationImg from '../assets/Animation - 1747050079135.gif';
import { GiPaintBrush } from 'react-icons/gi';
import { FaLaptopCode } from 'react-icons/fa';
import { FaBullhorn } from 'react-icons/fa';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openedByClick, setOpenedByClick] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setIsFixed(scrollPosition > heroHeight / 2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setOpenedByClick(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleDropdown = (open) => {
    if (!openedByClick) setDropdownOpen(open);
  };

  const handleDropdownClick = (e) => {
    e.preventDefault();
    setDropdownOpen((prev) => {
      const newState = !prev;
      setOpenedByClick(newState);
      return newState;
    });
  };

  const isServicePage = location.pathname.startsWith('/services/');
  const isActive = (path) => location.pathname === path;

  return (
    <header className="header-container">
      <div className="header-top">
        <nav className="header-nav">
          <Link className={isActive('/') ? 'active' : ''} to="/">Design Studio</Link>
          <Link className={isActive('/careers') ? 'active' : ''} to="/careers">Career Opportunities</Link>
        </nav>
        <div className="header-contact">
          <span className="contact-item"><a href="tel:+917600046416"><span role="img" aria-label="in-flag">🇮🇳</span>+91 76000 46416</a></span>
          <span className="contact-item"><a href="mailto:info@illusiodesigns.agency"><span role="img" aria-label="mail">✉️</span>Info@illusiodesigns.agency</a></span>
        </div>
      </div>
      <div className={`header-bottom ${isFixed ? 'fixed' : ''}`}>
        <Link to="/" className="header-logo">
          <img src={logo} alt="Illusio Designs Logo" />
        </Link>
        <nav className="header-menu">
          <div
            className={`dropdown ${isServicePage ? 'active' : ''}`}
            ref={dropdownRef}
            onMouseEnter={() => handleDropdown(true)}
          >
            <a href="#" onClick={handleDropdownClick}>
              Services <span>▼</span>
            </a>
            {dropdownOpen && (
              <div className="dropdown-menu-custom">
                <div className="dropdown-services-cards">
                  <Link to="/services/design" className="dropdown-service-card">
                    <div className="dropdown-service-icon"><GiPaintBrush /></div>
                    <div className="dropdown-service-content">
                      <div className="dropdown-service-title">Designing</div>
                      <div className="dropdown-service-desc">UI/UX, Branding, Prototyping</div>
                    </div>
                  </Link>
                  <Link to="/services/development" className="dropdown-service-card">
                    <div className="dropdown-service-icon"><FaLaptopCode /></div>
                    <div className="dropdown-service-content">
                      <div className="dropdown-service-title">Development</div>
                      <div className="dropdown-service-desc">Web & Mobile Apps, SaaS</div>
                    </div>
                  </Link>
                  <Link to="/services/marketing" className="dropdown-service-card">
                    <div className="dropdown-service-icon"><FaBullhorn /></div>
                    <div className="dropdown-service-content">
                      <div className="dropdown-service-title">Marketing</div>
                      <div className="dropdown-service-desc">SEO, Social Media, Campaigns</div>
                    </div>
                  </Link>
                </div>
                <div className="dropdown-image-right">
                  <img src={animationImg} alt="Service Visual" />
                </div>
              </div>
            )}
          </div>
          <Link className={isActive('/case-studies') ? 'active' : ''} to="/case-studies">Case Studies</Link>
          <Link className={isActive('/blog') ? 'active' : ''} to="/blog">Blog</Link>
          <Link className={isActive('/about-us') ? 'active' : ''} to="/about-us">About Us</Link>
          <Link className={isActive('/contact-us') ? 'active' : ''} to="/contact-us">Contact Us</Link>
        </nav>
        <button className="engage-btn" onClick={() => window.location.href = '/contact-us'}>Let's Engage</button>
      </div>
    </header>
  );
};

export default Header; 