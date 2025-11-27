'use client';

import { useState } from 'react';
import '@/styles/components/Header.css';
import CardNav from '@/components/CardNav';

export default function Header({ navigateTo, currentPage }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Map detail pages to their parent pages for active state
  const getActivePage = () => {
    if (!currentPage) return '';
    
    // Map detail pages to their parent pages
    if (currentPage === 'service-detail') return 'services';
    if (currentPage === 'case-study-detail') return '';
    if (currentPage === 'blog-detail') return 'blog';
    if (currentPage === 'position-apply') return 'career';
    
    return currentPage;
  };

  const activePage = getActivePage();

  const servicesItems = [
    {
      title: 'Branding & Design',
      description: 'Brand identity, guidelines, and creative systems that feel ownable.',
      icon: '/Icons/Brandanddesign.webp',
      accent: '#EC691F',
      background: '#000000',
      textColor: '#FAF9F6',
      path: 'service-detail',
      serviceName: 'branding'
    },
    {
      title: 'Web & App Development',
      description: 'Product-ready web, mobile, and immersive experiences built to scale.',
      icon: '/Icons/Web&app.webp',
      accent: '#EC691F',
      background: '#000000',
      textColor: '#FAF9F6',
      path: 'service-detail',
      serviceName: 'web-app'
    },
    {
      title: 'Digital Marketing',
      description: 'Lifecycle strategy across performance, content, and automation.',
      icon: '/Icons/digitalmarketing.webp',
      accent: '#EC691F',
      background: '#000000',
      textColor: '#FAF9F6',
      path: 'service-detail',
      serviceName: 'marketing'
    },
    {
      title: 'B2B & Custom Solutions',
      description: 'Complex workflows, portals, and bespoke tools for ambitious teams.',
      icon: '/Icons/b2bsolution.webp',
      accent: '#EC691F',
      background: '#000000',
      textColor: '#FAF9F6',
      path: 'service-detail',
      serviceName: 'b2b'
    }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
          <img src="/images/IllusioDesignfulllogo.webp" alt="Illusio Designs" className="logo-image" />
        </div>
        <nav className="nav">
          <ul>
            <li className="services-nav-item">
              <a 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className={activePage === 'services' ? 'active' : ''}
              >
                Services
              </a>
              <CardNav
                items={servicesItems}
                onNavigate={(path, serviceName) => navigateTo(path, serviceName)}
                isOpen={isServicesOpen}
                onClose={() => setIsServicesOpen(false)}
              />
            </li>
            <li>
              <a 
                onClick={() => navigateTo('projects')}
                className={activePage === 'projects' ? 'active' : ''}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                onClick={() => navigateTo('about')}
                className={activePage === 'about' ? 'active' : ''}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                onClick={() => navigateTo('career')}
                className={activePage === 'career' ? 'active' : ''}
              >
                Career
              </a>
            </li>
            <li>
              <a 
                onClick={() => navigateTo('blog')}
                className={activePage === 'blog' ? 'active' : ''}
              >
                Blog
              </a>
            </li>
          </ul>
        </nav>
        <button className="engage-button" onClick={() => navigateTo('contact')}>Let&apos;s Engage</button>
      </div>
    </header>
  );
}
