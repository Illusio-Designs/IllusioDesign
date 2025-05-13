import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import '../styles/pages/Home.css';
import logo from '../assets/logo.png';
import heroImage from '../assets/Animation - 1747050079135.gif';
import { FaPencilRuler, FaCode, FaBullhorn } from 'react-icons/fa';

const Home = () => {
  const statsRef = useRef(null);
  const [counts, setCounts] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
    rating: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start counting animation
          const duration = 2000; // 2 seconds
          const steps = 60; // 60 steps for smooth animation
          const stepDuration = duration / steps;

          const targetValues = {
            experience: 8,
            projects: 350,
            clients: 10,
            rating: 4.7
          };

          let currentStep = 0;
          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounts({
              experience: Math.floor(targetValues.experience * progress),
              projects: Math.floor(targetValues.projects * progress),
              clients: Math.floor(targetValues.clients * progress),
              rating: (targetValues.rating * progress).toFixed(1)
            });

            if (currentStep >= steps) {
              clearInterval(interval);
            }
          }, stepDuration);

          // Disconnect observer after animation starts
          observer.disconnect();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="hero-section">
        <div className="hero-left">
          <h1>Crafting Visual Brilliance That Speaks</h1>
          <p>We blend creativity with code to deliver stunning web, UI/UX, and graphic experiences that captivate, convert, and inspire.</p>
          <div className="hero-btn">
          <button className="engage-btn">Let's Engage</button>
          <button className="engage-btn view-btn">View Our Works</button>
          </div>
        </div>
        <div className="hero-right">
          <img src={heroImage} alt="Hero Image" />
        </div>
        
      </div>
      {/* Stats Section */}
      <div className="stats-section" ref={statsRef}>
        <div className="stat">
          <h2>{counts.experience}+</h2>
          <p>Experience (In Years)</p>
        </div>
        <div className="stat">
          <h2>{counts.projects}+</h2>
          <p>Successful Projects</p>
        </div>
        <div className="stat">
          <h2>{counts.clients}</h2>
          <p>Clients Across Countries</p>
        </div>
        <div className="stat">
          <h2>{counts.rating}/5+</h2>
          <p>Client Satisfaction Rating</p>
        </div>
      </div>
      {/* Company Logos Slider */}
      <div className="logo-slider-section">
        <div className="logo-slider">
          <div className="logo-slide">
            <img src={logo} alt="Logo 1" />
          </div>
          <div className="logo-slide">
            <img src={logo} alt="Logo 2" />
          </div>
          <div className="logo-slide">
            <img src={logo} alt="Logo 3" />
          </div>
          <div className="logo-slide">
            <img src={logo} alt="Logo 4" />
          </div>
          <div className="logo-slide">
            <img src={logo} alt="Logo 5" />
          </div>
          <div className="logo-slide">
            <img src={logo} alt="Logo 6" />
          </div>
          <div className="logo-slide">
            <img src={logo} alt="Logo 1" />
          </div>
          <div className="logo-slide">
            <img src={logo} alt="Logo 2" />
          </div>
          <div className="logo-slide">
            <img src={logo} alt="Logo 3" />
          </div>
          <div className="logo-slide">
            <img src={logo} alt="Logo 4" />
          </div>
          <div className="logo-slide">
            <img src={logo} alt="Logo 5" />
          </div>
          <div className="logo-slide">
            <img src={logo} alt="Logo 6" />
          </div>
        </div>
      </div>
      {/* Services Section */}
      <div className="services-section">
        <h2 className="services-title">Services we offer<span className="services-icon">⚡</span></h2>
        <div className="services-cards">
          <div className="service-card">
            <div className="service-icon"><FaPencilRuler /></div>
            <h3>Design</h3>
            <p>Creative and user-focused UI/UX and graphic design solutions.</p>
          </div>
          <div className="service-card service-card--highlighted">
            <div className="service-icon"><FaCode /></div>
            <h3>Development</h3>
            <p>Robust web and app development for seamless digital experiences.</p>
          </div>
          <div className="service-card">
            <div className="service-icon"><FaBullhorn /></div>
            <h3>Marketing</h3>
            <p>Strategic digital marketing to grow your brand and reach.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 