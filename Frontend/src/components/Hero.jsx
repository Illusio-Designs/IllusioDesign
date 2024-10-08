// src/components/Hero.jsx

import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css'; // Import custom CSS for styling

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Transforming Ideas into Reality
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Innovative solutions for your business needs.
          </motion.p>
          <div className="button-container">
            <motion.a
              href="#"
              className="hero-button primary-button"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Get Started
            </motion.a>
            <motion.a
              href="#"
              className="hero-button secondary-button"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Learn More
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
