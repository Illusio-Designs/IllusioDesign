'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Home from '@/pages/Home';
// import Services from '@/pages/Services';
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
import Login from '@/pages/Dashboard/Login';
import Register from '@/pages/Dashboard/Register';

export default function Page() {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState('home');
  const [currentItem, setCurrentItem] = useState('');

  // Initialize from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      
      // Don't handle dashboard routes here - they're handled by Next.js App Router
      if (path.startsWith('/dashboard') || path.startsWith('/login') || path.startsWith('/register')) {
        return;
      }
      
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
      
      // Don't handle dashboard routes here - they're handled by Next.js App Router
      if (path.startsWith('/dashboard') || path.startsWith('/login') || path.startsWith('/register')) {
        return;
      }
      
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

  // Don't render this component for dashboard/login/register routes
  // These are handled by Next.js App Router
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/login') || pathname?.startsWith('/register')) {
    return null;
  }

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
      case 'login':
        return <Login navigateTo={navigateTo} />;
      case 'register':
        return <Register navigateTo={navigateTo} />;
      default:
        return <Home navigateTo={navigateTo} currentPage={currentPage} />;
    }
  };

  return <>{renderPage()}</>;
}
