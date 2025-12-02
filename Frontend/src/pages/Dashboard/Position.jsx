'use client';

import { useState, useEffect, useRef } from 'react';
import { positionAPI } from '@/services/api';
import { toast } from 'react-toastify';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/Position.css';

export default function Position() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingPosition, setEditingPosition] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    description: '',
    requirements: '',
    isActive: true
  });

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchPositions();
  }, [currentPage]);

  const fetchPositions = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await positionAPI.getAll();
      if (result.data) {
        setPositions(result.data);
        setTotalPages(Math.ceil(result.data.length / itemsPerPage));
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
      department: '',
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
      department: position.department || '',
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
    { key: 'department', label: 'Department' },
    { key: 'location', label: 'Location' },
    { key: 'type', label: 'Type' },
    { key: 'isActive', label: 'Status', render: (value) => value ? 'Active' : 'Inactive' }
  ];

  const paginatedData = positions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleBack = () => {
    setShowTable(true);
    setIsModalOpen(false);
  };

  return (
    <div className="position-page">
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-title-wrapper">
            <button className="back-btn" onClick={handleBack}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
            <h1 className="page-title">Position</h1>
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
            <h2 className="content-card-title">Position</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <>
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
            <label>Department</label>
            <input type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
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
            <label>Requirements</label>
            <textarea value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} rows={5} />
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

