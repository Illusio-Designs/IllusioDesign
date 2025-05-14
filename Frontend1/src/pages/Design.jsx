import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/Design.css';

const Design = () => {
  return (
    <div className="design-page">
      <Header />
      <div className="design-main">
        <div className="hero-section">
          <h1>Design Services</h1>
          <p>Creating beautiful and functional digital experiences</p>
        </div>
        <div className="services-content">
          <div className="service-item">
            <h2>UI/UX Design</h2>
            <p>User-centered design solutions that enhance user experience and engagement</p>
          </div>
          <div className="service-item">
            <h2>Brand Identity</h2>
            <p>Comprehensive brand design including logos, color schemes, and visual guidelines</p>
          </div>
          <div className="service-item">
            <h2>Web Design</h2>
            <p>Responsive and modern website designs that convert visitors into customers</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Design; 