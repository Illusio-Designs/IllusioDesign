'use client';

import { useState, useEffect, useRef } from 'react';
import { reviewAPI } from '@/services/api';
import { toast } from 'react-toastify';
import { useSearch } from '@/contexts/SearchContext';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Loader from '@/components/common/Loader';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/Reviews.css';

// Star Rating Component for display
const StarRating = ({ rating = 5 }) => {
  return (
    <div className="star-rating-display">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={index < rating ? "#EC691F" : "#E5E5E5"}
          />
        </svg>
      ))}
    </div>
  );
};

export default function Reviews() {
  const { searchQuery } = useSearch();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [status, setStatus] = useState('pending');
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchReviews();
  }, [currentPage, searchQuery]);

  const fetchReviews = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await reviewAPI.getAll();
      if (result.data) {
        setReviews(result.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to fetch reviews. Please check if backend is running.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  const handleDelete = async (review) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      await reviewAPI.delete(review.id);
      fetchReviews();
      toast.success('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review: ' + error.message);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setStatus(review.status || 'pending');
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleBack = () => {
    setShowTable(true);
    setIsModalOpen(false);
    setEditingReview(null);
    setStatus('pending');
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      const currentStatus = editingReview.status;
      
      // Only call API if status actually changed
      if (status !== currentStatus) {
        if (status === 'approved') {
          await reviewAPI.approve(editingReview.id);
          toast.success('Review approved successfully');
        } else if (status === 'declined') {
          await reviewAPI.decline(editingReview.id);
          toast.success('Review declined successfully');
        } else {
          // Status is pending - no API call needed as it's the default
          toast.success('Review status updated successfully');
        }
      } else {
        toast.info('No changes to save');
        setIsModalOpen(false);
        setShowTable(true);
        setEditingReview(null);
        setStatus('pending');
        return;
      }
      
      setIsModalOpen(false);
      setShowTable(true);
      setEditingReview(null);
      setStatus('pending');
      fetchReviews();
    } catch (error) {
      console.error('Error updating review status:', error);
      toast.error('Failed to update review status: ' + error.message);
    }
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { 
      key: 'rating', 
      label: 'Rating',
      render: (value) => <StarRating rating={value} />
    },
    { 
      key: 'quote', 
      label: 'Review',
      render: (value) => value ? (value.length > 80 ? value.substring(0, 80) + '...' : value) : 'N/A'
    },
    { key: 'client', label: 'Client Name' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => {
        const statusColors = {
          pending: '#f59e0b',
          approved: '#10b981',
          declined: '#ef4444'
        };
        const color = statusColors[value] || '#6b7280';
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
    { key: 'createdAt', label: 'Date', render: (value) => value ? new Date(value).toISOString().split('T')[0] : 'N/A' }
  ];

  // Filter reviews based on search query
  const filteredReviews = reviews.filter(review => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      review.quote?.toLowerCase().includes(query) ||
      review.client?.toLowerCase().includes(query) ||
      review.status?.toLowerCase().includes(query) ||
      review.rating?.toString().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedData = filteredReviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="reviews-page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Reviews</h1>
        </div>
      </div>

      <div className="content-card">
        {showTable ? (
          <>
            {loading ? (
              <Loader size="large" />
            ) : (
              <>
                <h2 className="content-card-title">All Reviews</h2>
                <Table 
                  columns={columns} 
                  data={paginatedData} 
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  shouldShowEdit={(row) => true}
                />
                {totalPages > 1 && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
              </>
            )}
          </>
        ) : (
          <Modal isOpen={isModalOpen} onClose={handleBack} title="Update Review Status" inline>
            {editingReview && (
              <form onSubmit={handleStatusUpdate} className="application-status-form">
                <div className="form-group">
                  <label>Rating</label>
                  <div style={{ padding: '8px 0' }}>
                    <StarRating rating={editingReview.rating} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Client Name</label>
                  <input 
                    type="text" 
                    value={editingReview.client || ''} 
                    readOnly
                    style={{ backgroundColor: '#f9fafb', cursor: 'not-allowed' }}
                  />
                </div>
                <div className="form-group">
                  <label>Review</label>
                  <textarea 
                    value={editingReview.quote || ''} 
                    readOnly
                    rows={4}
                    style={{ backgroundColor: '#f9fafb', cursor: 'not-allowed', resize: 'none' }}
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    {editingReview.status === 'pending' && (
                      <>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="declined">Declined</option>
                      </>
                    )}
                    {editingReview.status === 'approved' && (
                      <>
                        <option value="approved">Approved</option>
                        <option value="declined">Declined</option>
                      </>
                    )}
                    {editingReview.status === 'declined' && (
                      <>
                        <option value="declined">Declined</option>
                        <option value="approved">Approved</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-btn">Update Status</button>
                </div>
              </form>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}

