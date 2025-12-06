'use client';

import { useState, useEffect, useRef } from 'react';
import { teamAPI } from '@/services/api';
import { toast } from 'react-toastify';
import { useSearch } from '@/contexts/SearchContext';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Loader from '@/components/common/Loader';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/Team.css';

// Use NEXT_PUBLIC_IMAGE_URL for images (consistent with public pages)
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';

// Helper function to construct image URL with fallback for old paths
const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath.trim() === '') return null;
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Ensure path starts with / for proper URL construction
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${IMAGE_BASE_URL}${normalizedPath}`;
};

// Helper function to get image URL with fallback for old team image paths
const getTeamImageUrl = (imagePath) => {
  const primaryUrl = getImageUrl(imagePath);
  if (!primaryUrl) return null;
  
  // If path doesn't include /team/ or /project/, try fallback paths for old images
  if (!imagePath.includes('/team/') && !imagePath.includes('/project/') && imagePath.includes('/uploads/images/')) {
    // Extract filename from path
    const filename = imagePath.split('/').pop();
    // Try team directory first (new location), then project (old location)
    return {
      primary: primaryUrl,
      fallbacks: [
        `${IMAGE_BASE_URL}/uploads/images/team/${filename}`,
        `${IMAGE_BASE_URL}/uploads/images/project/${filename}`
      ]
    };
  }
  
  return { primary: primaryUrl, fallbacks: [] };
};

export default function Team() {
  const { searchQuery } = useSearch();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingMember, setEditingMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    order: '',
    image: null
  });
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchTeamMembers();
  }, [currentPage, searchQuery]);

  const fetchTeamMembers = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await teamAPI.getAll();
      if (result.data) {
        setTeamMembers(result.data);
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
    setCurrentImage(null);
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
    // Set current image for display - same as Blog.jsx
    const imagePath = member.image || null;
    setCurrentImage(imagePath);
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
      
      // Add image
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      } else if (editingMember && !currentImage) {
        // If image was removed, send empty to delete
        formDataToSend.append('image', '');
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
      setCurrentImage(null);
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

  const removeCurrentImage = () => {
    setFormData({ ...formData, image: null });
    setCurrentImage(null);
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'order', label: 'Order' }
  ];

  // Filter team members based on search query
  const filteredTeamMembers = teamMembers.filter(member => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      member.name?.toLowerCase().includes(query) ||
      member.role?.toLowerCase().includes(query) ||
      member.bio?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredTeamMembers.length / itemsPerPage);
  const paginatedData = filteredTeamMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleBack = () => {
    setShowTable(true);
    setIsModalOpen(false);
  };

  return (
    <div className="team-page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Team</h1>
        </div>
        {showTable && !loading && (
          <div className="page-header-right">
            <div className="page-add-button-wrapper">
              <button className="add-btn-inline" onClick={handleAdd}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Add New Team Member</span>
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
                <h2 className="content-card-title">Team</h2>
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
            <div className="file-upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              <div className="upload-placeholder">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M28 8H12C10.3431 8 9 9.34315 9 11V37C9 38.6569 10.3431 40 12 40H36C37.6569 40 39 38.6569 39 37V20M28 8L39 20M28 8V20H39" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <p>Drag & Drop your Files or Browse</p>
              </div>
              
              {/* Current Image Preview */}
              {currentImage && !formData.image && (() => {
                const imageUrls = getTeamImageUrl(currentImage);
                if (!imageUrls) return null;
                
                return (
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Current Image:</div>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img 
                        src={imageUrls.primary}
                        alt="Current team member"
                        style={{ 
                          maxWidth: '200px', 
                          maxHeight: '150px', 
                          borderRadius: '8px',
                          objectFit: 'cover',
                          border: '1px solid #e5e5e5',
                          display: 'block'
                        }}
                        onError={(e) => {
                          // Try fallback URLs if primary fails
                          if (imageUrls.fallbacks && imageUrls.fallbacks.length > 0) {
                            const fallbackUrl = imageUrls.fallbacks.shift();
                            console.log('Trying fallback URL:', fallbackUrl);
                            e.target.src = fallbackUrl;
                          } else {
                            console.error('Image load error:', currentImage, 'Full URL:', imageUrls.primary);
                            e.target.style.display = 'none';
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={removeCurrentImage}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Remove image"
                      >
                        X
                      </button>
                    </div>
                  </div>
                );
              })()}
              
              {/* New Selected Image Preview */}
              {formData.image && (
                <div style={{ marginTop: '12px' }}>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>New Selected: {formData.image.name}</div>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img 
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      style={{ 
                        maxWidth: '200px', 
                        maxHeight: '150px', 
                        borderRadius: '8px',
                        objectFit: 'cover',
                        border: '1px solid #e5e5e5',
                        display: 'block'
                      }}
                      onError={(e) => {
                        console.error('Preview image load error');
                        e.target.style.display = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, image: null });
                        if (editingMember && editingMember.image) {
                          setCurrentImage(editingMember.image);
                        } else {
                          setCurrentImage(null);
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Remove"
                    >
                      X
                    </button>
                  </div>
                </div>
              )}
            </div>
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

