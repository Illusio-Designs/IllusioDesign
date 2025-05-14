import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Header />
      <div className="about-us-main">
        <div className="hero-section">
          <h1>About Us</h1>
          <p>Learn more about our team and mission</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs; 