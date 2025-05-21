import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/Marketing.css';

const Marketing = () => {
  return (
    <div className="marketing-page">
      <Header />
      <div className="marketing-main">
        <div className="hero-section">
          <h1>Marketing Services</h1>
          <p>Strategic digital marketing solutions to grow your business</p>
        </div>
        <div className="services-content">
          <div className="service-item">
            <h2>Digital Marketing</h2>
            <p>Comprehensive digital marketing strategies including SEO, PPC, and social media</p>
          </div>
          <div className="service-item">
            <h2>Content Marketing</h2>
            <p>Engaging content creation and distribution to attract and retain customers</p>
          </div>
          <div className="service-item">
            <h2>Analytics & Reporting</h2>
            <p>Data-driven insights and performance tracking to optimize your marketing efforts</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Marketing; 