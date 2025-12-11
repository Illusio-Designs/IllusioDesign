'use client';

import { useState, useEffect, useLayoutEffect, Suspense, lazy } from 'react';
import { usePathname } from 'next/navigation';
import { setPageContext } from '@/services/fetchInterceptor';
import Home from '@/pages/Home';
import { serviceNameToSlug, slugToServiceName } from '@/utils/urlSlug';

// Dynamic imports for code splitting - pages load only when needed
const AboutUs = lazy(() => import('@/pages/AboutUs'));
const Career = lazy(() => import('@/pages/Career'));
const Blog = lazy(() => import('@/pages/Blog'));
const CaseStudy = lazy(() => import('@/pages/CaseStudy'));
const ContactUs = lazy(() => import('@/pages/ContactUs'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const CaseStudyDetail = lazy(() => import('@/pages/CaseStudyDetail'));
const BlogDetail = lazy(() => import('@/pages/BlogDetail'));
const PositionApply = lazy(() => import('@/pages/PositionApply'));
const Login = lazy(() => import('@/pages/Dashboard/Login'));
const Register = lazy(() => import('@/pages/Dashboard/Register'));

// Suspense fallback intentionally empty (no extra loading UI here)
const PageLoader = () => null;

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
        return (
          <Suspense fallback={<PageLoader />}>
            <AboutUs navigateTo={navigateTo} currentPage={currentPage} />
          </Suspense>
        );
      case 'career':
        return (
          <Suspense fallback={<PageLoader />}>
            <Career navigateTo={navigateTo} currentPage={currentPage} />
          </Suspense>
        );
      case 'blog':
        return (
          <Suspense fallback={<PageLoader />}>
            <Blog navigateTo={navigateTo} currentPage={currentPage} />
          </Suspense>
        );
      case 'case-study':
        return (
          <Suspense fallback={<PageLoader />}>
            <CaseStudy navigateTo={navigateTo} currentPage={currentPage} />
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<PageLoader />}>
            <ContactUs navigateTo={navigateTo} currentPage={currentPage} />
          </Suspense>
        );
      case 'privacy':
        return (
          <Suspense fallback={<PageLoader />}>
            <PrivacyPolicy navigateTo={navigateTo} currentPage={currentPage} />
          </Suspense>
        );
      case 'terms':
        return (
          <Suspense fallback={<PageLoader />}>
            <TermsOfService navigateTo={navigateTo} currentPage={currentPage} />
          </Suspense>
        );
      case 'service-detail':
      case 'services':
        return (
          <Suspense fallback={<PageLoader />}>
            <ServiceDetail key={currentItem} serviceName={currentItem} navigateTo={navigateTo} currentPage={currentPage} />
          </Suspense>
        );
      case 'case-study-detail':
        return (
          <Suspense fallback={<PageLoader />}>
            <CaseStudyDetail caseStudyName={currentItem} navigateTo={navigateTo} currentPage={currentPage} />
          </Suspense>
        );
      case 'blog-detail':
        return (
          <Suspense fallback={<PageLoader />}>
            <BlogDetail blogName={currentItem} navigateTo={navigateTo} currentPage={currentPage} />
          </Suspense>
        );
      case 'position-apply':
        return (
          <Suspense fallback={<PageLoader />}>
            <PositionApply positionId={currentItem} navigateTo={navigateTo} currentPage={currentPage} />
          </Suspense>
        );
      case 'login':
        return (
          <Suspense fallback={<PageLoader />}>
            <Login navigateTo={navigateTo} />
          </Suspense>
        );
      case 'register':
        return (
          <Suspense fallback={<PageLoader />}>
            <Register navigateTo={navigateTo} />
          </Suspense>
        );
      default:
        return <Home navigateTo={navigateTo} currentPage={currentPage} />;
    }
  };

  return <>{renderPage()}</>;
}
