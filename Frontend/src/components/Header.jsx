'use client';

import { useState, useEffect } from 'react';
import '@/styles/components/Header.css';
import CardNav from '@/components/CardNav';
import { useTheme } from '@/hooks/useTheme';

export default function Header({ navigateTo, currentPage }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = useTheme();

  // Map detail pages to their parent pages for active state
  const getActivePage = () => {
    if (!currentPage) return '';
    
    // Map detail pages to their parent pages
    if (currentPage === 'service-detail') return 'services';
    if (currentPage === 'case-study-detail') return 'case-study';
    if (currentPage === 'blog-detail') return 'blog';
    if (currentPage === 'position-apply') return 'career';
    
    return currentPage;
  };

  const activePage = getActivePage();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [currentPage]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsServicesOpen(false);
  };

  const handleNavClick = (path, serviceName = null) => {
    if (serviceName) {
      navigateTo(path, serviceName);
    } else {
      navigateTo(path);
    }
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const servicesItems = [
    {
      title: 'Branding & Design',
      description: 'Build a brand that stands out with identity systems, visual guidelines, and impactful creatives tailored to your audience.',
      icon: '/Icons/Brandanddesign.webp',
      accent: '#EC691F',
      background: '#000000',
      textColor: '#FAF9F6',
      path: 'service-detail',
      serviceName: 'branding'
    },
    {
      title: 'Web & App Development',
      description: 'Fast, scalable, and user-friendly digital products—from websites to mobile apps—crafted for real-world performance.',
      icon: '/Icons/Web&app.webp',
      accent: '#EC691F',
      background: '#000000',
      textColor: '#FAF9F6',
      path: 'service-detail',
      serviceName: 'web-app'
    },
    {
      title: 'Digital Marketing',
      description: 'Grow your business with performance-driven marketing strategies across SEO, social media, ads, automation, and content.',
      icon: '/Icons/digitalmarketing.webp',
      accent: '#EC691F',
      background: '#000000',
      textColor: '#FAF9F6',
      path: 'service-detail',
      serviceName: 'marketing'
    },
    {
      title: 'B2B & Custom Solutions',
      description: 'Custom-built portals, internal tools, automated workflows, and enterprise solutions to streamline operations.',
      icon: '/Icons/b2bsolution.webp',
      accent: '#EC691F',
      background: '#000000',
      textColor: '#FAF9F6',
      path: 'service-detail',
      serviceName: 'b2b'
    }
  ];

  return (
    <header className={`header ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ cursor: 'pointer', textDecoration: 'none' }}>
          <div className="logo" style={{ cursor: 'pointer' }}>
            <img 
              src={isDark ? "/images/Illusio Design Logo WHITE.webp" : "/images/IllusioDesignfulllogo.webp"} 
              alt="Illusio Designs" 
              className="logo-image"
              width="150"
              height="40"
            />
          </div>
        </a>
        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li className="services-nav-item">
              <a 
                href="/services"
                onClick={(e) => { 
                  e.preventDefault(); 
                  if (window.innerWidth <= 768) {
                    setIsServicesOpen(!isServicesOpen);
                  } else {
                    setIsServicesOpen(!isServicesOpen);
                  }
                }}
                onMouseEnter={() => {
                  if (window.innerWidth > 768) {
                    setIsServicesOpen(true);
                  }
                }}
                className={activePage === 'services' ? 'active' : ''}
              >
                Services
              </a>
              <CardNav
                items={servicesItems}
                onNavigate={(path, serviceName) => handleNavClick(path, serviceName)}
                isOpen={isServicesOpen}
                onClose={() => setIsServicesOpen(false)}
              />
            </li>
            <li>
              <a 
                href="/case-study"
                onClick={(e) => { e.preventDefault(); handleNavClick('case-study'); }}
                className={activePage === 'case-study' ? 'active' : ''}
              >
                Case Study
              </a>
            </li>
            <li>
              <a 
                href="/about"
                onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
                className={activePage === 'about' ? 'active' : ''}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="/career"
                onClick={(e) => { e.preventDefault(); handleNavClick('career'); }}
                className={activePage === 'career' ? 'active' : ''}
              >
                Career
              </a>
            </li>
            <li>
              <a 
                href="/blog"
                onClick={(e) => { e.preventDefault(); handleNavClick('blog'); }}
                className={activePage === 'blog' ? 'active' : ''}
              >
                Blog
              </a>
            </li>
            <li className="mobile-engage-button-item">
              <a 
                href="/contact" 
                onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} 
                className="mobile-engage-button"
              >
                Let&apos;s Engage
              </a>
            </li>
          </ul>
        </nav>
        <a 
          href="/contact" 
          onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} 
          className="engage-button desktop-engage-button" 
          style={{ textDecoration: 'none' }}
        >
          Let&apos;s Engage
        </a>
        <button 
          className={`burger-menu ${isMobileMenuOpen ? 'burger-open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
