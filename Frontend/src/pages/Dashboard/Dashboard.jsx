'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { setPageContext } from '@/services/fetchInterceptor';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import DashboardHome from './DashboardHome';
import Blog from './Blog';
import CaseStudy from './CaseStudy';
import Position from './Position';
import Application from './Application';
import Contact from './Contact';
import Team from './Team';
import SEO from './SEO';
import Users from './Users';
import Profile from './Profile';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

export default function Dashboard({ initialPage }) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(initialPage || 'dashboard');

  // Set dashboard context on mount
  useEffect(() => {
    setPageContext('dashboard');
  }, []);

  useEffect(() => {
    // Sync page state with URL
    if (pathname) {
      const pathParts = pathname.split('/').filter(Boolean);
      if (pathParts[0] === 'dashboard') {
        const page = pathParts[1] || 'dashboard';
        setCurrentPage(page);
        setPageContext('dashboard'); // Set dashboard context for all dashboard pages
      }
    }
  }, [pathname]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPageContext('dashboard'); // Set dashboard context for all dashboard pages
    // Update URL without full page reload
    const newPath = page === 'dashboard' ? '/dashboard' : `/dashboard/${page}`;
    router.push(newPath, { scroll: false });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
      case '':
        return <DashboardHome />;
      case 'blog':
        return <Blog />;
      case 'case-study':
      case 'project':
        return <CaseStudy />;
      case 'position':
        return <Position />;
      case 'application':
        return <Application />;
      case 'contact':
        return <Contact />;
      case 'team':
        return <Team />;
      case 'seo':
        return <SEO />;
      case 'users':
        return <Users />;
      case 'profile':
        return <Profile />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'terms-of-service':
        return <TermsOfService />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={handlePageChange}>
      {renderPage()}
    </DashboardLayout>
  );
}

