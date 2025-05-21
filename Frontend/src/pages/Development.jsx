import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/Development.css';

const Development = () => {
  return (
    <div className="development-page">
      <Header />
      <div className="development-main">
        <div className="hero-section">
          <h1>Development Services</h1>
          <p>Building robust and scalable digital solutions</p>
        </div>
        <div className="services-content">
          <div className="service-item">
            <h2>Web Development</h2>
            <p>Custom websites and web applications built with modern technologies</p>
          </div>
          <div className="service-item">
            <h2>Mobile Development</h2>
            <p>Native and cross-platform mobile applications for iOS and Android</p>
          </div>
          <div className="service-item">
            <h2>E-commerce Solutions</h2>
            <p>Custom e-commerce platforms and online store development</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Development; 