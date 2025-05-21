import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CaseStudies from './pages/CaseStudies';
import Blog from './pages/Blog';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Design from './pages/Design';
import Development from './pages/Development';
import Marketing from './pages/Marketing';
import CustomCursor from './components/CustomCursor';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <CustomCursor />
      <WhatsAppButton 
        phoneNumber="7600046146"
        message="Hello! I'm interested in your services."
      />
      <ChatBot />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/services/design" element={<Design />} />
        <Route path="/services/development" element={<Development />} />
        <Route path="/services/marketing" element={<Marketing />} />
      </Routes>
    </Router>
  );
}

export default App;
