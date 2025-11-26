'use client';

import { useRef, useEffect } from 'react';
import '@/styles/components/CardNav.css';

const CardNav = ({ items, onNavigate, isOpen, onClose }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="card-nav-overlay" onClick={onClose}>
      <div
        ref={cardRef}
        className="card-nav-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-nav-grid">
          {items.map((item, index) => (
            <div
              key={index}
              className="card-nav-item"
              onClick={() => {
                onNavigate(item.path, item.serviceName);
                onClose();
              }}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardNav;


