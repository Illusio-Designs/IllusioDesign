'use client';

import { useState, useEffect, useRef } from 'react';
import { applicationAPI } from '@/services/api';
import { toast } from 'react-toastify';
import Table from '@/components/common/Table';
import Pagination from '@/components/common/Pagination';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/Application.css';

export default function Application() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchApplications();
  }, [currentPage]);

  const fetchApplications = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await applicationAPI.getAll();
      if (result.data) {
        setApplications(result.data);
        setTotalPages(Math.ceil(result.data.length / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch applications. Please check if backend is running.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  const handleDelete = async (application) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await applicationAPI.delete(application.id);
      fetchApplications();
      toast.success('Application deleted successfully');
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to delete application: ' + error.message);
    }
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Date', render: (value) => value ? new Date(value).toISOString().split('T')[0] : 'N/A' }
  ];

  const paginatedData = applications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="application-page">
      <div className="page-header">
        <div className="page-header-left">
          <button className="back-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <h1 className="page-title">Application</h1>
        </div>
      </div>

      <div className="content-card">
        <h2 className="content-card-title">Application</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <Table columns={columns} data={paginatedData} onDelete={handleDelete} onEdit={null} />
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

