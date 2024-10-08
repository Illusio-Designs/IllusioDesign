// src/components/Header.jsx

import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Header.css'; // Import custom CSS for additional styling
import Logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        {/* Logo Section */}
        <motion.div
          className="logo"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={Logo}// Replace with your logo path
            alt="Halo Lab Logo"
            className="logo-image"
          />
        </motion.div>

        {/* Navigation Menu */}
        <nav>
          <ul className="nav-menu">
            <li>
              <a href="#" className="nav-link">Home</a>
            </li>
            <li>
              <a href="#" className="nav-link">About</a>
            </li>
            <li>
              <a href="#" className="nav-link">Services</a>
            </li>
            <li>
              <a href="#" className="nav-link">Blog</a>
            </li>
            <li>
              <a href="#" className="nav-link">Contact</a>
            </li>
          </ul>
        </nav>

        {/* Call to Action Button */}
        <div>
          <a href="#" className="cta-button">Get Started</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
