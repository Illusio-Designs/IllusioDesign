'use client';

import { useState, useEffect, useRef } from 'react';
import { seoAPI } from '@/services/api';
import { toast } from 'react-toastify';
import { useSearch } from '@/contexts/SearchContext';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/SEO.css';

export default function SEO() {
  const { searchQuery } = useSearch();
  const [seoData, setSeoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingSEO, setEditingSEO] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);
  const [formData, setFormData] = useState({
    page: '',
    title: '',
    description: '',
    keywords: '',
    ogImage: null
  });

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchSEO();
  }, [currentPage]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const fetchSEO = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await seoAPI.getAll();
      if (result.data) {
        setSeoData(result.data);
      }
    } catch (error) {
      console.error('Error fetching SEO:', error);
      toast.error('Failed to fetch SEO data. Please check if backend is running.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  const handleAdd = () => {
    setEditingSEO(null);
    setFormData({ page: '', title: '', description: '', keywords: '', ogImage: null });
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleEdit = (seo) => {
    setEditingSEO(seo);
    setFormData({
      page: seo.page || '',
      title: seo.title || '',
      description: seo.description || '',
      keywords: seo.keywords || '',
      ogImage: null
    });
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleDelete = async (seo) => {
    if (!confirm('Are you sure you want to delete this SEO data?')) return;
    try {
      await seoAPI.delete(seo.id);
      fetchSEO();
      toast.success('SEO data deleted successfully');
    } catch (error) {
      console.error('Error deleting SEO:', error);
      toast.error('Failed to delete SEO data: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'ogImage' && formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });
      if (formData.ogImage) {
        formDataToSend.append('ogImage', formData.ogImage);
      }

      if (editingSEO) {
        await seoAPI.update(editingSEO.page, formDataToSend);
        toast.success('SEO data updated successfully');
      } else {
        await seoAPI.create(formDataToSend);
        toast.success('SEO data created successfully');
      }
      
      setIsModalOpen(false);
      setShowTable(true);
      fetchSEO();
    } catch (error) {
      console.error('Error saving SEO:', error);
      toast.error('Failed to save SEO data: ' + error.message);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, ogImage: e.target.files[0] });
    }
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { key: 'page', label: 'Page' },
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description', render: (value) => value ? (value.length > 50 ? value.substring(0, 50) + '...' : value) : 'N/A' }
  ];

  // Filter SEO data based on search query
  const filteredSEOData = seoData.filter(seo => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      seo.page?.toLowerCase().includes(query) ||
      seo.title?.toLowerCase().includes(query) ||
      seo.description?.toLowerCase().includes(query) ||
      seo.keywords?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredSEOData.length / itemsPerPage);
  const paginatedData = filteredSEOData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleBack = () => {
    setShowTable(true);
    setIsModalOpen(false);
  };

  return (
    <div className="seo-page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">SEO</h1>
        </div>
        {showTable && !loading && (
          <div className="page-header-right">
            <div className="page-add-button-wrapper">
              <button className="add-btn-inline" onClick={handleAdd}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Add New SEO</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="content-card">
        {showTable ? (
          <>
            <h2 className="content-card-title">SEO</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <>
                <Table columns={columns} data={paginatedData} onEdit={handleEdit} onDelete={handleDelete} actions={false} />
                {totalPages > 1 && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
              </>
            )}
          </>
        ) : (
          <Modal isOpen={isModalOpen} onClose={handleBack} title={editingSEO ? 'Edit SEO' : 'Add SEO'} inline>
        <form onSubmit={handleSubmit} className="seo-form">
          <div className="form-group">
            <label>Page</label>
            <input type="text" value={formData.page} onChange={(e) => setFormData({ ...formData, page: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
          </div>
          <div className="form-group">
            <label>Keywords</label>
            <input type="text" value={formData.keywords} onChange={(e) => setFormData({ ...formData, keywords: e.target.value })} />
          </div>
          <div className="form-group">
            <label>OG Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </form>
          </Modal>
        )}
      </div>
    </div>
  );
}

