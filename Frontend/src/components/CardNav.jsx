'use client';

import { useRef, useEffect, useState } from 'react';
import '@/styles/components/CardNav.css';
import { serviceNameToSlug } from '@/utils/urlSlug';

const CardNav = ({ items, onNavigate, isOpen, onClose }) => {
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen && !isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, isMobile]);

  if (!isOpen) return null;

  // Mobile: Simple dropdown list with icons
  if (isMobile) {
    return (
      <ul ref={cardRef} className="card-nav-mobile-dropdown">
        {items.map((item, index) => {
          const slug = serviceNameToSlug(item.serviceName);
          return (
            <li key={index} className="card-nav-mobile-item">
              <a
                href={`/services/${slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.path, item.serviceName);
                  onClose();
                }}
                className="card-nav-mobile-link"
              >
                <div className="card-nav-mobile-icon">
                  <img 
                    src={item.icon} 
                    alt={item.title}
                    className="card-nav-mobile-icon-img"
                  />
                </div>
                <span className="card-nav-mobile-text">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  // Desktop: Full card grid overlay
  return (
    <div className="card-nav-overlay" onClick={onClose}>
      <div
        ref={cardRef}
        className="card-nav-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-nav-grid">
          {items.map((item, index) => {
            const slug = serviceNameToSlug(item.serviceName);
            return (
            <a
              key={index}
              href={`/services/${slug}`}
              className="card-nav-item"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.path, item.serviceName);
                onClose();
              }}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="card-nav-icon">
                <span
                  className="card-nav-icon-mask"
                  style={{
                    WebkitMaskImage: `url(${item.icon})`,
                    maskImage: `url(${item.icon})`
                  }}
                  aria-hidden="true"
                />
              </div>
              <div className="card-nav-content">
                <h3 className="card-nav-title">{item.title}</h3>
                <p className="card-nav-description">{item.description}</p>
              </div>
              <div className="card-nav-arrow">→</div>
            </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardNav;


