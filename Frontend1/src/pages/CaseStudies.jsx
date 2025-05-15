import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import img from "../assets/logo.png";
import logo from '../assets/logo black.png';
import '../styles/pages/CaseStudies.css';

// Export showcase data to be used in Home page
export const showcaseData = {
  all: [
    { img: logo, title: 'Car Lease : An application that features car leasing model in India', category: 'web' },
    { img: logo, title: 'E-commerce Platform Redesign', category: 'mobile' },
    { img: logo, title: 'Healthcare App Development', category: 'ui' },
    { img: logo, title: 'Banking Dashboard Interface', category: 'web' },
    { img: logo, title: 'Food Delivery App Design', category: 'mobile' },
    { img: logo, title: 'Educational Platform UI/UX', category: 'ui' },
    { img: logo, title: 'Real Estate Website Design', category: 'web' },
    { img: logo, title: 'Fitness Tracking App', category: 'mobile' },
  ],
  web: [
    { img: logo, title: 'Car Lease : An application that features car leasing model in India', category: 'web' },
    { img: logo, title: 'Banking Dashboard Interface', category: 'web' },
    { img: logo, title: 'Real Estate Website Design', category: 'web' },
  ],
  mobile: [
    { img: logo, title: 'E-commerce Platform Redesign', category: 'mobile' },
    { img: logo, title: 'Food Delivery App Design', category: 'mobile' },
    { img: logo, title: 'Fitness Tracking App', category: 'mobile' },
  ],
  ui: [
    { img: logo, title: 'Healthcare App Development', category: 'ui' },
    { img: logo, title: 'Educational Platform UI/UX', category: 'ui' },
  ]
};

const CaseStudies = () => {
  const [activeTab, setActiveTab] = useState('all');
  const showcaseCardsRef = useRef([]);

  useEffect(() => {
    // Showcase cards animation observer
    const showcaseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    showcaseCardsRef.current.forEach((card) => {
      if (card) {
        showcaseObserver.observe(card);
      }
    });

    return () => {
      showcaseCardsRef.current.forEach((card) => {
        if (card) {
          showcaseObserver.unobserve(card);
        }
      });
    };
  }, [activeTab]); // Re-run when activeTab changes

  const tabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ui', label: 'UI/UX Design' }
  ];

  return (
    <div className="case-studies-page">
      <Header />
      <div className="case-studies-main">
        <div className="hero-section">
          <div className="hero-section-text">
            <p className='hero-title'>Our Case Studies</p>
            <h2>Empowering Brands <br />Through Design<span className="dot">.</span></h2>
            <p>Crafting digital journeys that are intuitive and impactful. We turn ideas into engaging realities, tailored for your success</p>
            <button className="engage-btn" onClick={() => window.location.href = '/contact-us'}>Book A call</button>
          </div>
          <div className="hero-section-image">
            <img src={img} alt='img' />
          </div>
        </div>
        
        {/* Showcase Section */}
        <div className="showcase-section">
          <div className="showcase-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="showcase-cards">
            {showcaseData[activeTab].map((showcase, index) => (
              <div 
                key={index} 
                className="showcase-card"
                ref={el => showcaseCardsRef.current[index] = el}
              >
                <div className="showcase-card-inner">
                  <img 
                    src={showcase.img} 
                    alt={showcase.title} 
                    className="showcase-img"
                  />
                </div>
                <h3>{showcase.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudies; 