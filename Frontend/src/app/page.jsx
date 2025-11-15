'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
      case 'service-detail':
        return <ServiceDetail serviceName={currentItem} navigateTo={navigateTo} />;
      case 'case-study-detail':
        return <CaseStudyDetail caseStudyName={currentItem} navigateTo={navigateTo} />;
      case 'blog-detail':
        return <BlogDetail blogName={currentItem} navigateTo={navigateTo} />;
      default:
        return (
          <>
            <Header navigateTo={navigateTo} />
            <main>
              <Home />
              <Services navigateTo={navigateTo} />
              <Portfolio />
              <CaseStudy navigateTo={navigateTo} />
              <AboutUs />
              <Career />
              <Blog navigateTo={navigateTo} />
              <ContactUs />
              <PrivacyPolicy />
              <TermsOfService />
            </main>
            <Footer navigateTo={navigateTo} />
          </>
        );
    }
  };

  return <>{renderPage()}</>;
}
