'use client';

import { useState, useEffect } from 'react';
import { SearchProvider } from '@/contexts/SearchContext';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import '@/styles/components/Dashboard/DashboardLayout.css';

export default function DashboardLayout({ children, currentPage, onPageChange }) {
  const [sidebarType, setSidebarType] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Determine sidebar type based on current page and maintain sidebar state
  useEffect(() => {
    const siteUpdatePages = ['blog', 'case-study', 'project', 'position', 'team', 'seo', 'users'];
    const businessPages = ['application', 'contact', 'privacy-policy', 'terms-of-service'];
    
    // Only update sidebar if we're navigating to a page that belongs to a sidebar category
    if (siteUpdatePages.includes(currentPage)) {
      setSidebarType('site-update');
      setIsSidebarOpen(true);
    } else if (businessPages.includes(currentPage)) {
      setSidebarType('business');
      setIsSidebarOpen(true);
    }
    // If navigating to dashboard home or other pages, keep sidebar state as is (don't force close)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSidebarToggle = (type) => {
    // Always keep sidebar open when clicking tabs
    // If sidebar is closed, open it
    // If sidebar is open, just switch the type (don't close)
    setSidebarType(type);
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
    setSidebarType(null);
  };

  return (
    <SearchProvider>
      <div className="dashboard-layout">
        <DashboardHeader
          currentPage={currentPage}
          onPageChange={onPageChange}
          onSidebarToggle={handleSidebarToggle}
        />
        <div className="dashboard-content-wrapper">
          <Sidebar
            isOpen={isSidebarOpen}
            type={sidebarType}
            onClose={handleSidebarClose}
            onPageChange={onPageChange}
            currentPage={currentPage}
          />
          <main className={`dashboard-main ${isSidebarOpen ? 'with-sidebar' : ''}`}>
            {children}
          </main>
        </div>
      </div>
    </SearchProvider>
  );
}

