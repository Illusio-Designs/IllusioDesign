'use client';

import { useState, useEffect, useRef } from 'react';
import { privacyPolicyAPI } from '@/services/api';
import { toast } from 'react-toastify';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/PrivacyPolicy.css';

export default function PrivacyPolicy() {
  const [privacyPolicies, setPrivacyPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);
  const [formData, setFormData] = useState({
    content: ''
  });

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchPrivacyPolicies();
  }, [currentPage]);

  const fetchPrivacyPolicies = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await privacyPolicyAPI.getAll();
      if (result.data) {
        setPrivacyPolicies(result.data);
      }
    } catch (error) {
      console.error('Error fetching privacy policies:', error);
      toast.error('Failed to fetch privacy policies. Please check if backend is running.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  const handleAdd = () => {
    setEditingPolicy(null);
    setFormData({ content: '' });
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setFormData({
      content: policy.content || ''
    });
    setIsModalOpen(true);
    setShowTable(false);
    // Auto-resize textarea after modal opens
    setTimeout(() => {
      const textarea = document.querySelector('.privacy-policy-form .editor-content');
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }, 100);
  };

  const handleDelete = async (policy) => {
    if (!confirm('Are you sure you want to delete this privacy policy?')) return;
    try {
      await privacyPolicyAPI.delete(policy.id);
      fetchPrivacyPolicies();
      toast.success('Privacy Policy deleted successfully');
    } catch (error) {
      console.error('Error deleting privacy policy:', error);
      toast.error('Failed to delete privacy policy: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingPolicy) {
        await privacyPolicyAPI.update(editingPolicy.id, formData);
        toast.success('Privacy Policy updated successfully');
      } else {
        await privacyPolicyAPI.create(formData);
        toast.success('Privacy Policy created successfully');
      }
      
      setIsModalOpen(false);
      setShowTable(true);
      fetchPrivacyPolicies();
    } catch (error) {
      console.error('Error saving privacy policy:', error);
      toast.error('Failed to save privacy policy: ' + error.message);
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

  const totalPages = Math.ceil(privacyPolicies.length / itemsPerPage);
  const paginatedData = privacyPolicies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="privacy-policy-page">
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-title-wrapper">
            <button className="back-btn" onClick={handleBack}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="page-title">Privacy Policy</h1>
          </div>
          {showTable && !loading && (
            <div className="page-add-button-wrapper">
              <button className="add-btn-inline" onClick={handleAdd} title="Add New">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="content-card">
        {showTable ? (
          <>
            <h2 className="content-card-title">Privacy Policy</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <>
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
            title={editingPolicy ? 'Edit Privacy Policy' : 'Add Privacy Policy'}
            size="large"
            inline
          >
            <form onSubmit={handleSubmit} className="privacy-policy-form">
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
                  {loading ? 'Saving...' : editingPolicy ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}
