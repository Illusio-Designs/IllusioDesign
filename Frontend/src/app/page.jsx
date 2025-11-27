'use client';

import { useState, useEffect } from 'react';
import Home from '@/pages/Home';
// import Services from '@/pages/Services';
import Projects from '@/pages/Projects';
import AboutUs from '@/pages/AboutUs';
import Career from '@/pages/Career';
import Blog from '@/pages/Blog';
import CaseStudy from '@/pages/CaseStudy';
import ContactUs from '@/pages/ContactUs';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import ServiceDetail from '@/pages/ServiceDetail';
import CaseStudyDetail from '@/pages/CaseStudyDetail';
import BlogDetail from '@/pages/BlogDetail';
import PositionApply from '@/pages/PositionApply';

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentItem, setCurrentItem] = useState('');

  // Initialize from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const item = params.get('item');
      
      if (path === '/' || path === '/home') {
        setCurrentPage('home');
        setCurrentItem('');
      } else {
        const page = path.substring(1).split('?')[0]; // Remove leading slash and query params
        setCurrentPage(page);
        if (item) setCurrentItem(item);
      }
    }
  }, []);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const item = params.get('item');
      
      if (path === '/' || path === '/home') {
        setCurrentPage('home');
        setCurrentItem('');
      } else {
        const page = path.substring(1).split('?')[0]; // Remove leading slash and query params
        setCurrentPage(page);
        if (item) setCurrentItem(item || '');
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page, item = '') => {
    setCurrentPage(page);
    setCurrentItem(item);
    
    // Update URL
    const url = page === 'home' ? '/' : `/${page}${item ? `?item=${encodeURIComponent(item)}` : ''}`;
    window.history.pushState({}, '', url);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} currentPage={currentPage} />;
      // case 'services':
      //   return <Services navigateTo={navigateTo} currentPage={currentPage} />;  
      case 'projects':
        return <Projects navigateTo={navigateTo} currentPage={currentPage} />;
      case 'about':
        return <AboutUs navigateTo={navigateTo} currentPage={currentPage} />;
      case 'career':
        return <Career navigateTo={navigateTo} currentPage={currentPage} />;
      case 'blog':
        return <Blog navigateTo={navigateTo} currentPage={currentPage} />;
      case 'case-study':
        return <CaseStudy navigateTo={navigateTo} currentPage={currentPage} />;
      case 'contact':
        return <ContactUs navigateTo={navigateTo} currentPage={currentPage} />;
      case 'privacy':
        return <PrivacyPolicy navigateTo={navigateTo} currentPage={currentPage} />;
      case 'terms':
        return <TermsOfService navigateTo={navigateTo} currentPage={currentPage} />;
      case 'service-detail':
        return <ServiceDetail key={currentItem} serviceName={currentItem} navigateTo={navigateTo} currentPage={currentPage} />;
      case 'case-study-detail':
        return <CaseStudyDetail caseStudyName={currentItem} navigateTo={navigateTo} currentPage={currentPage} />;
      case 'blog-detail':
        return <BlogDetail blogName={currentItem} navigateTo={navigateTo} currentPage={currentPage} />;
      case 'position-apply':
        return <PositionApply positionId={currentItem} navigateTo={navigateTo} currentPage={currentPage} />;
      default:
        return <Home navigateTo={navigateTo} currentPage={currentPage} />;
    }
  };

  return <>{renderPage()}</>;
}
