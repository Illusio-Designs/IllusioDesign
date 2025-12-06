'use client';

import { useState, useEffect, useRef } from 'react';
import { applicationAPI } from '@/services/api';
import { toast } from 'react-toastify';
import { useSearch } from '@/contexts/SearchContext';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/Application.css';

export default function Application() {
  const { searchQuery } = useSearch();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingApplication, setEditingApplication] = useState(null);
  const [status, setStatus] = useState('pending');
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchApplications();
  }, [currentPage]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const fetchApplications = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await applicationAPI.getAll();
      if (result.data) {
        setApplications(result.data);
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

  const handleEdit = (application) => {
    if (application.status !== 'pending') {
      toast.warning('Only pending applications can be edited');
      return;
    }
    setEditingApplication(application);
    setStatus(application.status || 'pending');
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleBack = () => {
    setShowTable(true);
    setIsModalOpen(false);
    setEditingApplication(null);
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      await applicationAPI.update(editingApplication.id, { status });
      toast.success('Application status updated successfully');
      setIsModalOpen(false);
      setShowTable(true);
      setEditingApplication(null);
      fetchApplications();
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('Failed to update application: ' + error.message);
    }
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { key: 'name', label: 'Name' },
    { 
      key: 'email', 
      label: 'Email',
      render: (value) => (
        <span title={value} style={{ display: 'block', maxWidth: '200px', margin: '0 auto' }}>
          {value}
        </span>
      )
    },
    { 
      key: 'contact', 
      label: 'Contact',
      render: (value) => (
        <span title={value || 'N/A'}>
          {value || 'N/A'}
        </span>
      )
    },
    {
      key: 'position',
      label: 'Position',
      render: (value, row) => {
        if (row.position) {
          return row.position.title || 'N/A';
        }
        return 'N/A';
      }
    },
    {
      key: 'portfolio',
      label: 'Portfolio',
      render: (value) => {
        const portfolioValue = value?.trim();
        if (portfolioValue) {
          // Ensure the link is clickable even if protocol is missing
          const href = /^https?:\/\//i.test(portfolioValue)
            ? portfolioValue
            : `https://${portfolioValue}`;
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007bff', textDecoration: 'underline' }}
              title={portfolioValue}
            >
              View Portfolio
            </a>
          );
        }
        return 'N/A';
      }
    },
    {
      key: 'resume',
      label: 'Resume',
      render: (value) => {
        if (value) {
          // Construct proper URL for resume
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.illusiodesigns.agency/api';
          // Remove /api from the end if present, then append the resume path
          const baseUrl = apiBaseUrl.replace(/\/api$/, '');
          const resumeUrl = value.startsWith('http') ? value : `${baseUrl}${value}`;
          return (
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>
              View Resume
            </a>
          );
        }
        return 'N/A';
      }
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => {
        const statusColors = {
          pending: '#ffc107',
          reviewed: '#17a2b8',
          accepted: '#28a745',
          rejected: '#dc3545'
        };
        const color = statusColors[value] || '#6c757d';
        return (
          <span style={{ 
            padding: '4px 8px', 
            borderRadius: '4px', 
            backgroundColor: color + '20',
            color: color,
            fontWeight: '500',
            textTransform: 'capitalize'
          }}>
            {value || 'pending'}
          </span>
        );
      }
    },
    { 
      key: 'createdAt', 
      label: 'Date', 
      render: (value) => value ? new Date(value).toISOString().split('T')[0] : 'N/A' 
    }
  ];

  // Filter applications based on search query
  const filteredApplications = applications.filter(app => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      app.name?.toLowerCase().includes(query) ||
      app.email?.toLowerCase().includes(query) ||
      app.contact?.toLowerCase().includes(query) ||
      app.position?.title?.toLowerCase().includes(query) ||
      app.status?.toLowerCase().includes(query) ||
      app.portfolio?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedData = filteredApplications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="application-page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Application</h1>
        </div>
      </div>

      <div className="content-card">
        {showTable ? (
          <>
            <h2 className="content-card-title">Application</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <>
                <Table 
                  columns={columns} 
                  data={paginatedData} 
                  onDelete={handleDelete} 
                  onEdit={handleEdit}
                  shouldShowEdit={(row) => row.status === 'pending'}
                />
                {totalPages > 1 && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
              </>
            )}
          </>
        ) : (
          <Modal isOpen={isModalOpen} onClose={handleBack} title="Update Application Status" inline>
            <form onSubmit={handleStatusUpdate} className="application-status-form">
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Update Status</button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}

