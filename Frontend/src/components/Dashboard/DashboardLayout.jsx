'use client';

import { SearchProvider } from '@/contexts/SearchContext';
import DashboardHeader from './DashboardHeader';
import '@/styles/components/Dashboard/DashboardLayout.css';

export default function DashboardLayout({ children, currentPage, onPageChange }) {
  return (
    <SearchProvider>
      <div className="dashboard-layout">
        <DashboardHeader
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </SearchProvider>
  );
}

