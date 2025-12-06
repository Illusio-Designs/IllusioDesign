'use client';

import { useState, useEffect, useRef } from 'react';
import { positionAPI } from '@/services/api';
import { toast } from 'react-toastify';
import { useSearch } from '@/contexts/SearchContext';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Loader from '@/components/common/Loader';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/Position.css';

export default function Position() {
  const { searchQuery } = useSearch();
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingPosition, setEditingPosition] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);
  const [formData, setFormData] = useState({
    title: '',
    experience: '',
    location: '',
    type: '',
    description: '',
    requirements: '',
    isActive: true
  });

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchPositions();
  }, [currentPage, searchQuery]);

  const fetchPositions = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await positionAPI.getAll();
      if (result.data) {
        setPositions(result.data);
      }
    } catch (error) {
      console.error('Error fetching positions:', error);
      toast.error('Failed to fetch positions. Please check if backend is running.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  const handleAdd = () => {
    setEditingPosition(null);
    setFormData({
      title: '',
      experience: '',
      location: '',
      type: '',
      description: '',
      requirements: '',
      isActive: true
    });
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleEdit = (position) => {
    setEditingPosition(position);
    setFormData({
      title: position.title || '',
      experience: position.experience || '',
      location: position.location || '',
      type: position.type || '',
      description: position.description || '',
      requirements: position.requirements || '',
      isActive: position.isActive !== false
    });
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleDelete = async (position) => {
    if (!confirm('Are you sure you want to delete this position?')) return;
    try {
      await positionAPI.delete(position.id);
      fetchPositions();
      toast.success('Position deleted successfully');
    } catch (error) {
      console.error('Error deleting position:', error);
      toast.error('Failed to delete position: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPosition) {
        await positionAPI.update(editingPosition.id, formData);
        toast.success('Position updated successfully');
      } else {
        await positionAPI.create(formData);
        toast.success('Position created successfully');
      }
      
      setIsModalOpen(false);
      setShowTable(true);
      fetchPositions();
    } catch (error) {
      console.error('Error saving position:', error);
      toast.error('Failed to save position: ' + error.message);
    }
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { key: 'title', label: 'Title' },
    { key: 'experience', label: 'Experience Required:', render: (value) => value || 'N/A' },
    { key: 'location', label: 'Location', render: (value) => value || 'N/A' },
    { key: 'type', label: 'Type', render: (value) => value || 'N/A' },
    { key: 'isActive', label: 'Status', render: (value) => value ? 'Active' : 'Inactive' }
  ];

  // Filter positions based on search query
  const filteredPositions = positions.filter(pos => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      pos.title?.toLowerCase().includes(query) ||
      pos.experience?.toLowerCase().includes(query) ||
      pos.location?.toLowerCase().includes(query) ||
      pos.type?.toLowerCase().includes(query) ||
      pos.description?.toLowerCase().includes(query) ||
      pos.requirements?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredPositions.length / itemsPerPage);
  const paginatedData = filteredPositions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleBack = () => {
    setShowTable(true);
    setIsModalOpen(false);
  };

  return (
    <div className="position-page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Position</h1>
        </div>
        {showTable && !loading && (
          <div className="page-header-right">
            <div className="page-add-button-wrapper">
              <button className="add-btn-inline" onClick={handleAdd}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Add New Position</span>
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
                <h2 className="content-card-title">Position</h2>
                <Table columns={columns} data={paginatedData} onEdit={handleEdit} onDelete={handleDelete} />
                {totalPages > 1 && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
              </>
            )}
          </>
        ) : (
          <Modal isOpen={isModalOpen} onClose={handleBack} title={editingPosition ? 'Edit Position' : 'Add Position'} inline>
        <form onSubmit={handleSubmit} className="position-form">
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Experience Required</label>
            <input type="text" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} placeholder="e.g., 2+ Years, 5+ Years, Fresher" />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Type</label>
            <input type="text" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={5} />
          </div>
          <div className="form-group">
            <label>Software Skills</label>
            <textarea value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} rows={5} placeholder="e.g., CorelDraw, Photoshop, Illustrator, Figma, React, etc." />
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
              Active
            </label>
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

