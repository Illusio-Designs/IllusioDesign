'use client';

import { useState, useEffect, useRef } from 'react';
import { applicationAPI, contactAPI } from '@/services/api';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/DashboardHome.css';

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalMessages: 0
  });
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent multiple API calls
    if (hasFetched.current) return;
    hasFetched.current = true;
    
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [applications, messages] = await Promise.all([
        applicationAPI.getAll().catch(() => ({ data: [] })),
        contactAPI.getAll().catch(() => ({ data: [] }))
      ]);

      setStats({
        totalApplications: applications.data?.length || 0,
        totalMessages: messages.data?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-home">
      <div className="page-header">
        <button className="back-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="page-title">Dashboard</h1>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading stats...</div>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon application-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalApplications}</div>
              <div className="stat-label">Applications</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon message-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalMessages}</div>
              <div className="stat-label">Messages</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


