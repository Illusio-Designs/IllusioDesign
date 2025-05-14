import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <Header />
      <div className="contact-us-main">
        <div className="hero-section">
          <h1>Contact Us</h1>
          <p>Get in touch with our team</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs; 