'use client';

import { useState } from 'react';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Portfolio from '@/pages/Portfolio';
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

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentItem, setCurrentItem] = useState('');

  const navigateTo = (page, item = '') => {
    setCurrentPage(page);
    setCurrentItem(item);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'services':
        return <Services navigateTo={navigateTo} />;
      case 'portfolio':
        return <Portfolio navigateTo={navigateTo} />;
      case 'about':
        return <AboutUs navigateTo={navigateTo} />;
      case 'career':
        return <Career navigateTo={navigateTo} />;
      case 'blog':
        return <Blog navigateTo={navigateTo} />;
      case 'case-study':
        return <CaseStudy navigateTo={navigateTo} />;
      case 'contact':
        return <ContactUs navigateTo={navigateTo} />;
      case 'privacy':
        return <PrivacyPolicy navigateTo={navigateTo} />;
      case 'terms':
        return <TermsOfService navigateTo={navigateTo} />;
      case 'service-detail':
        return <ServiceDetail serviceName={currentItem} navigateTo={navigateTo} />;
      case 'case-study-detail':
        return <CaseStudyDetail caseStudyName={currentItem} navigateTo={navigateTo} />;
      case 'blog-detail':
        return <BlogDetail blogName={currentItem} navigateTo={navigateTo} />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return <>{renderPage()}</>;
}
