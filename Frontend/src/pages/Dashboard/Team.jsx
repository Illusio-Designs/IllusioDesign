'use client';

import { useState, useEffect, useRef } from 'react';
import { teamAPI } from '@/services/api';
import { toast } from 'react-toastify';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/Team.css';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingMember, setEditingMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    order: '',
    image: null
  });

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchTeamMembers();
  }, [currentPage]);

  const fetchTeamMembers = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await teamAPI.getAll();
      if (result.data) {
        setTeamMembers(result.data);
        setTotalPages(Math.ceil(result.data.length / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error('Failed to fetch team members. Please check if backend is running.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  const handleAdd = () => {
    setEditingMember(null);
    setFormData({ name: '', role: '', bio: '', order: '', image: null });
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      role: member.role || '',
      bio: member.bio || '',
      order: member.order !== undefined && member.order !== null ? member.order.toString() : '',
      image: null
    });
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleDelete = async (member) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      await teamAPI.delete(member.id);
      fetchTeamMembers();
      toast.success('Team member deleted successfully');
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast.error('Failed to delete team member: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'order') {
          // Handle order field - send it even if empty (backend will use default 0)
          formDataToSend.append('order', formData.order === '' ? '0' : formData.order);
        } else if (key !== 'image' && formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (editingMember) {
        await teamAPI.update(editingMember.id, formDataToSend);
        toast.success('Team member updated successfully');
      } else {
        await teamAPI.create(formDataToSend);
        toast.success('Team member created successfully');
      }
      
      setIsModalOpen(false);
      setShowTable(true);
      fetchTeamMembers();
    } catch (error) {
      console.error('Error saving team member:', error);
      toast.error('Failed to save team member: ' + error.message);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'order', label: 'Order' }
  ];

  const paginatedData = teamMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleBack = () => {
    setShowTable(true);
    setIsModalOpen(false);
  };

  return (
    <div className="team-page">
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-title-wrapper">
            <button className="back-btn" onClick={handleBack}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
            <h1 className="page-title">Team</h1>
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
            <h2 className="content-card-title">Team</h2>
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
          <Modal isOpen={isModalOpen} onClose={handleBack} title={editingMember ? 'Edit Team Member' : 'Add Team Member'} inline>
        <form onSubmit={handleSubmit} className="team-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={5} />
          </div>
          <div className="form-group">
            <label>Order</label>
            <input 
              type="number" 
              value={formData.order} 
              onChange={(e) => setFormData({ ...formData, order: e.target.value })} 
              placeholder="Display order (lower numbers appear first)"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Image</label>
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

