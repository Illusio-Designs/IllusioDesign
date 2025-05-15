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
            <h2>Empowering Brands <br />Through Design<span className="dot">.</span>
              <svg className="position-absolute case-spiral-arrow" width="148" height="153" viewBox="0 0 148 153" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="path" d="M142.53 99.0271C141.97 102.05 141.913 105.144 142.359 108.186C132.062 90.7933 125.218 99.5688 116.792 112.19C115.593 113.74 112.196 117.997 111.131 114.406C111.825 101.205 121.506 89.9558 122.536 76.537C122.896 74.5646 122.634 72.5291 121.786 70.7121C120.939 68.8951 119.548 67.3862 117.805 66.394C116.063 65.4019 114.056 64.9754 112.061 65.1738C110.066 65.3721 108.181 66.1853 106.668 67.501C98.0732 74.8113 94.1706 85.713 87.2223 94.2165C77.0061 109.969 56.0004 107.872 53.8545 87.9119C63.9254 85.1067 81.176 72.7579 71.348 61.4751C57.1791 52.7471 47.5977 74.3783 48.8994 85.9952C20.1094 91.6916 6.80846 64.1315 4.556 39.7984L3.89208 39.8451C5.10803 65.3934 19.2673 93.9517 49.1229 88.9886C50.1419 106.352 69.2997 116.779 83.7056 106.092C94.3957 98.4456 99.7464 86.2018 107.608 76.2463C109.521 74.0734 112.611 70.2155 115.286 72.9388C117.052 78.4944 113.601 85.1788 111.998 90.7784C109.63 97.7871 106.437 104.621 105.826 112.179C104.905 117.939 111.067 123.379 116.229 119.321C125.961 110.948 127.637 90.0452 141.469 108.984C138.801 107.348 134.966 106.341 132.148 108.179L132.244 108.416C136.349 108.505 139.287 111.007 142.816 112.622C143.121 112.78 143.468 112.837 143.807 112.786C144.147 112.734 144.461 112.576 144.705 112.335C144.95 112.094 145.111 111.781 145.167 111.443C145.222 111.104 145.169 110.756 145.015 110.449C143.434 106.889 142.894 102.972 142.826 99.0787L142.53 99.0271ZM54.2289 77.2727C62.2844 48.0129 86.4233 71.5673 53.5925 84.6862C53.5218 82.1989 53.7353 79.7116 54.2289 77.2727ZM143.114 111.296C143.129 111.334 143.128 111.318 143.114 111.296V111.296Z" stroke="#ec691f" strokeWidth="2" fill="none"/>
                <path className="path2" d="M16.8992 59.964C20.5437 67.2749 28.2814 75.6597 35.9004 78.7516C35.9146 78.7591 35.9258 78.7711 35.9324 78.7857C35.9389 78.8004 35.9403 78.8168 35.9364 78.8323C35.9325 78.8478 35.9235 78.8616 35.9108 78.8714C35.8981 78.8812 35.8825 78.8865 35.8665 78.8864C27.6012 77.7061 18.572 68.0677 16.7769 60.0297C16.773 60.0142 16.7744 59.9979 16.7808 59.9833C16.7872 59.9687 16.7984 59.9567 16.8124 59.9491C16.8265 59.9416 16.8426 59.9389 16.8584 59.9416C16.8741 59.9443 16.8885 59.9522 16.8992 59.964Z" stroke="#ec691f" strokeWidth="2" fill="none"/>
                <path className="path3" d="M13.8338 52.838C14.8131 54.0315 15.4271 55.4823 15.602 57.0162C15.6101 57.0762 15.5969 57.1372 15.5649 57.1886C15.5328 57.24 15.4838 57.2787 15.4264 57.2979C15.3689 57.3171 15.3065 57.3156 15.25 57.2938C15.1934 57.272 15.1463 57.2311 15.1166 57.1783C14.268 55.9317 13.6727 54.5304 13.3647 53.0541C13.346 52.9938 13.3498 52.9287 13.3755 52.871C13.4013 52.8132 13.4471 52.7668 13.5045 52.7404C13.5619 52.7139 13.6269 52.7093 13.6875 52.7272C13.7481 52.7452 13.8001 52.7845 13.8338 52.838Z" stroke="#ec691f" strokeWidth="2" fill="none"/>
                <path className="path4" d="M83.5772 85.4644C83.6201 84.7798 83.8127 84.1129 84.1414 83.5108C84.4701 82.9087 84.9268 82.386 85.4795 81.9796C85.5363 81.9402 85.6028 81.9172 85.6718 81.913C85.7408 81.9087 85.8096 81.9235 85.8708 81.9557C85.932 81.9878 85.9832 82.0362 86.0188 82.0954C86.0545 82.1546 86.0732 82.2225 86.0729 82.2916C86.0304 82.9763 85.838 83.6433 85.5092 84.2455C85.1805 84.8476 84.7236 85.3703 84.1707 85.7764C84.1135 85.814 84.0473 85.8355 83.9789 85.8389C83.9106 85.8422 83.8426 85.8272 83.782 85.7953C83.7214 85.7635 83.6705 85.716 83.6345 85.6578C83.5985 85.5996 83.5787 85.5328 83.5772 85.4644Z" stroke="#ec691f" strokeWidth="2" fill="none"/>
                <path className="path5" d="M86.8534 80.1105C90.2822 70.9741 99.154 57.1218 109.968 58.8903C110.012 58.8926 110.052 58.9115 110.082 58.9431C110.112 58.9746 110.128 59.0164 110.128 59.0597C110.127 59.103 110.11 59.1445 110.08 59.1757C110.05 59.2068 110.009 59.2252 109.966 59.227C99.804 60.9017 93.467 72.7327 87.1517 80.3044C87.1259 80.344 87.0856 80.3717 87.0394 80.3815C86.9933 80.3912 86.9451 80.3823 86.9056 80.3566C86.8661 80.3308 86.8383 80.2905 86.8286 80.2444C86.8188 80.1982 86.8277 80.1501 86.8534 80.1105Z" stroke="#ec691f" strokeWidth="2" fill="none"/>
              </svg>
            </h2>
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