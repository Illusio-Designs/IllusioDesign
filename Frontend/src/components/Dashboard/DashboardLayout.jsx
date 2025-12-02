'use client';

import { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import '@/styles/components/Dashboard/DashboardLayout.css';

export default function DashboardLayout({ children, currentPage, onPageChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Pass search to current page if needed
    if (children && children.props && children.props.onSearch) {
      children.props.onSearch(query);
    }
  };

  return (
    <div className="dashboard-layout">
      <DashboardHeader
        currentPage={currentPage}
        onPageChange={onPageChange}
        onSearch={handleSearch}
      />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}

