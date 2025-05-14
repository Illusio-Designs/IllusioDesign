import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/CaseStudies.css';

const CaseStudies = () => {
  return (
    <div className="case-studies-page">
      <Header />
      <div className="case-studies-main">
        <div className="hero-section">
          <h1>Our Case Studies</h1>
          <p>Discover how we've helped businesses transform their digital presence</p>
        </div>

        
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudies; 