'use client';

import { useState, useEffect, useRef } from 'react';
import { termsOfServiceAPI } from '@/services/api';
import { toast } from 'react-toastify';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Loader from '@/components/common/Loader';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/TermsOfService.css';

export default function TermsOfService() {
  const [termsOfService, setTermsOfService] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingTerms, setEditingTerms] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);
  const [formData, setFormData] = useState({
    content: ''
  });

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchTermsOfService();
  }, [currentPage]);

  const fetchTermsOfService = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await termsOfServiceAPI.getAll();
      if (result.data) {
        setTermsOfService(result.data);
      }
    } catch (error) {
      console.error('Error fetching terms of service:', error);
      toast.error('Failed to fetch terms of service. Please check if backend is running.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  const handleAdd = () => {
    setEditingTerms(null);
    setFormData({ content: '' });
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleEdit = (terms) => {
    setEditingTerms(terms);
    setFormData({
      content: terms.content || ''
    });
    setIsModalOpen(true);
    setShowTable(false);
    // Auto-resize textarea after modal opens
    setTimeout(() => {
      const textarea = document.querySelector('.terms-of-service-form .editor-content');
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }, 100);
  };

  const handleDelete = async (terms) => {
    if (!confirm('Are you sure you want to delete this terms of service?')) return;
    try {
      await termsOfServiceAPI.delete(terms.id);
      fetchTermsOfService();
      toast.success('Terms of Service deleted successfully');
    } catch (error) {
      console.error('Error deleting terms of service:', error);
      toast.error('Failed to delete terms of service: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingTerms) {
        await termsOfServiceAPI.update(editingTerms.id, formData);
        toast.success('Terms of Service updated successfully');
      } else {
        await termsOfServiceAPI.create(formData);
        toast.success('Terms of Service created successfully');
      }
      
      setIsModalOpen(false);
      setShowTable(true);
      fetchTermsOfService();
    } catch (error) {
      console.error('Error saving terms of service:', error);
      toast.error('Failed to save terms of service: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowTable(true);
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { 
      key: 'content', 
      label: 'Content', 
      render: (value) => value ? (value.length > 100 ? value.substring(0, 100) + '...' : value) : 'N/A' 
    },
    { 
      key: 'lastUpdated', 
      label: 'Last Updated', 
      render: (value) => value ? new Date(value).toLocaleDateString() : 'N/A' 
    },
    { 
      key: 'createdAt', 
      label: 'Created At', 
      render: (value) => value ? new Date(value).toLocaleDateString() : 'N/A' 
    }
  ];

  const totalPages = Math.ceil(termsOfService.length / itemsPerPage);
  const paginatedData = termsOfService.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="terms-of-service-page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Terms of Service</h1>
        </div>
        {showTable && !loading && (
          <div className="page-header-right">
            <div className="page-add-button-wrapper">
              <button className="add-btn-inline" onClick={handleAdd}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Add New</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="content-card">
        {showTable ? (
          <>
            {loading ? (
              <Loader size="large" />
            ) : (
              <>
                <h2 className="content-card-title">Terms of Service</h2>
                <Table
                  columns={columns}
                  data={paginatedData}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <Modal
            isOpen={isModalOpen}
            onClose={handleBack}
            title={editingTerms ? 'Edit Terms of Service' : 'Add Terms of Service'}
            size="large"
            inline
          >
            <form onSubmit={handleSubmit} className="terms-of-service-form">
              <div className="form-grid">
                <div className="form-column">
                  <div className="form-group">
                    <label>Content</label>
                    <div className="rich-text-editor">
                      <div className="editor-toolbar">
                        <button type="button" className="toolbar-btn"><strong>B</strong></button>
                        <button type="button" className="toolbar-btn"><em>I</em></button>
                        <button type="button" className="toolbar-btn"><u>U</u></button>
                        <button type="button" className="toolbar-btn">Heading</button>
                        <button type="button" className="toolbar-btn">Subheading</button>
                      </div>
                      <textarea
                        className="editor-content auto-resize"
                        value={formData.content}
                        onChange={(e) => {
                          setFormData({ ...formData, content: e.target.value });
                          // Auto-resize textarea
                          e.target.style.height = 'auto';
                          e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Saving...' : editingTerms ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}
