'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { setPageContext } from '@/services/fetchInterceptor';
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
import { serviceNameToSlug, slugToServiceName } from '@/utils/urlSlug';

export default function Page() {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState('home');
  const [currentItem, setCurrentItem] = useState('');

  // Set page context synchronously before first render (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      
      // Don't handle dashboard routes here - they're handled by Next.js App Router
      if (path.startsWith('/dashboard') || path.startsWith('/login') || path.startsWith('/register')) {
        return;
      }
      
      let page;
      if (path === '/' || path === '/home') {
        page = 'home';
      } else if (path.startsWith('/services/')) {
        page = 'service-detail';
      } else if (path.startsWith('/positions/apply/') || path.startsWith('/careers/apply/')) {
        page = 'position-apply';
      } else if (path.startsWith('/blog/') && path !== '/blog') {
        page = 'blog-detail';
      } else if (path.startsWith('/case-studies/') || path.startsWith('/projects/')) {
        page = 'case-study-detail';
      } else {
        page = path.substring(1).split('?')[0];
      }
      setPageContext(page);
    }
  }, []);

  // Initialize from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      
      // Don't handle dashboard routes here - they're handled by Next.js App Router
      if (path.startsWith('/dashboard') || path.startsWith('/login') || path.startsWith('/register')) {
        return;
      }
      
      const params = new URLSearchParams(window.location.search);
      let item = params.get('item');
      
      if (path === '/' || path === '/home') {
        setCurrentPage('home');
        setCurrentItem('');
        setPageContext('home');
      } else if (path.startsWith('/services/')) {
        // Handle clean URL format: /services/web-app-development
        const slug = path.substring('/services/'.length);
        const serviceName = slugToServiceName(slug);
        setCurrentPage('service-detail');
        setCurrentItem(serviceName);
        setPageContext('service-detail');
        // Redirect to clean URL if old format was used
        if (item && window.location.search) {
          const cleanSlug = serviceNameToSlug(serviceName);
          window.history.replaceState({}, '', `/services/${cleanSlug}`);
        }
      } else if (path.startsWith('/positions/apply/') || path.startsWith('/careers/apply/')) {
        // Handle clean URL format: /positions/apply/1 or /careers/apply/1
        const pathParts = path.split('/');
        const positionId = pathParts[pathParts.length - 1];
        setCurrentPage('position-apply');
        setCurrentItem(positionId);
        setPageContext('position-apply');
        // Redirect to clean URL if old format was used
        if (item && window.location.search) {
          window.history.replaceState({}, '', `/positions/apply/${positionId}`);
        }
      } else if (path.startsWith('/blog/') && path !== '/blog') {
        // Handle clean URL format: /blog/blog-slug-name
        const slug = path.substring('/blog/'.length);
        setCurrentPage('blog-detail');
        setCurrentItem(slug);
        setPageContext('blog-detail');
        // Redirect to clean URL if old format was used
        if (item && window.location.search) {
          window.history.replaceState({}, '', `/blog/${slug}`);
        }
      } else if (path.startsWith('/case-studies/') || path.startsWith('/projects/')) {
        // Handle clean URL format: /case-studies/1 or /projects/1
        const pathParts = path.split('/');
        const projectId = pathParts[pathParts.length - 1];
        setCurrentPage('case-study-detail');
        setCurrentItem(projectId);
        setPageContext('case-study-detail');
        // Redirect to clean URL if old format was used
        if (item && window.location.search) {
          window.history.replaceState({}, '', `/case-studies/${projectId}`);
        }
      } else {
        const page = path.substring(1).split('?')[0]; // Remove leading slash and query params
        setCurrentPage(page);
        if (item) setCurrentItem(item);
        setPageContext(page);
        
        // Redirect old service-detail URLs to new format
        if (page === 'service-detail' && item) {
          const cleanSlug = serviceNameToSlug(item);
          window.history.replaceState({}, '', `/services/${cleanSlug}`);
        }
        // Redirect old position-apply URLs to new format
        if (page === 'position-apply' && item) {
          window.history.replaceState({}, '', `/positions/apply/${item}`);
        }
        // Redirect old blog-detail URLs to new format
        if (page === 'blog-detail' && item) {
          window.history.replaceState({}, '', `/blog/${item}`);
        }
        // Redirect old case-study-detail URLs to new format
        if (page === 'case-study-detail' && item) {
          window.history.replaceState({}, '', `/case-studies/${item}`);
        }
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
      let item = params.get('item');
      
      if (path === '/' || path === '/home') {
        setCurrentPage('home');
        setCurrentItem('');
        setPageContext('home');
      } else if (path.startsWith('/services/')) {
        // Handle clean URL format: /services/web-app-development
        const slug = path.substring('/services/'.length);
        const serviceName = slugToServiceName(slug);
        setCurrentPage('service-detail');
        setCurrentItem(serviceName);
        setPageContext('service-detail');
      } else if (path.startsWith('/positions/apply/') || path.startsWith('/careers/apply/')) {
        // Handle clean URL format: /positions/apply/1 or /careers/apply/1
        const pathParts = path.split('/');
        const positionId = pathParts[pathParts.length - 1];
        setCurrentPage('position-apply');
        setCurrentItem(positionId);
        setPageContext('position-apply');
      } else if (path.startsWith('/blog/') && path !== '/blog') {
        // Handle clean URL format: /blog/blog-slug-name
        const slug = path.substring('/blog/'.length);
        setCurrentPage('blog-detail');
        setCurrentItem(slug);
        setPageContext('blog-detail');
      } else if (path.startsWith('/case-studies/') || path.startsWith('/projects/')) {
        // Handle clean URL format: /case-studies/1 or /projects/1
        const pathParts = path.split('/');
        const projectId = pathParts[pathParts.length - 1];
        setCurrentPage('case-study-detail');
        setCurrentItem(projectId);
        setPageContext('case-study-detail');
      } else {
        const page = path.substring(1).split('?')[0]; // Remove leading slash and query params
        setCurrentPage(page);
        if (item) setCurrentItem(item || '');
        setPageContext(page);
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
    setPageContext(page); // Update page context for interceptors
    
    // Update URL with clean format for services and positions
    let url;
    if (page === 'home') {
      url = '/';
    } else if (page === 'service-detail' && item) {
      // Use clean URL format: /services/web-app-development
      const slug = serviceNameToSlug(item);
      url = `/services/${slug}`;
    } else if (page === 'position-apply' && item) {
      // Use clean URL format: /positions/apply/1
      url = `/positions/apply/${item}`;
    } else if (page === 'blog-detail' && item) {
      // Use clean URL format: /blog/blog-slug-name
      url = `/blog/${item}`;
    } else if (page === 'case-study-detail' && item) {
      // Use clean URL format: /case-studies/1
      url = `/case-studies/${item}`;
    } else {
      // For other pages, use existing format
      url = `/${page}${item ? `?item=${encodeURIComponent(item)}` : ''}`;
    }
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
      case 'services':
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
