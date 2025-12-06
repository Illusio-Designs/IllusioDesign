'use client';

import { useState, useEffect, useRef } from 'react';
import { contactAPI } from '@/services/api';
import { toast } from 'react-toastify';
import { useSearch } from '@/contexts/SearchContext';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Loader from '@/components/common/Loader';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/Contact.css';

export default function Contact() {
  const { searchQuery } = useSearch();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingMessage, setEditingMessage] = useState(null);
  const [status, setStatus] = useState('unread');
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchMessages();
  }, [currentPage, searchQuery]);

  const fetchMessages = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await contactAPI.getAll();
      if (result.data) {
        setMessages(result.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch messages. Please check if backend is running.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  const handleDelete = async (message) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await contactAPI.delete(message.id);
      fetchMessages();
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message: ' + error.message);
    }
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    setStatus(message.status || 'unread');
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleBack = () => {
    setShowTable(true);
    setIsModalOpen(false);
    setEditingMessage(null);
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      await contactAPI.update(editingMessage.id, { status });
      toast.success('Message status updated successfully');
      setIsModalOpen(false);
      setShowTable(true);
      setEditingMessage(null);
      fetchMessages();
    } catch (error) {
      console.error('Error updating message:', error);
      toast.error('Failed to update message status: ' + error.message);
    }
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone', render: (value) => value || 'N/A' },
    { key: 'subject', label: 'Subject' },
    { 
      key: 'message', 
      label: 'Message',
      render: (value) => value ? (value.length > 50 ? value.substring(0, 50) + '...' : value) : 'N/A'
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => {
        const statusColors = {
          unread: '#ef4444',
          read: '#6b7280',
          replied: '#10b981'
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
            {value || 'unread'}
          </span>
        );
      }
    },
    { key: 'createdAt', label: 'Date', render: (value) => value ? new Date(value).toISOString().split('T')[0] : 'N/A' }
  ];

  // Filter messages based on search query
  const filteredMessages = messages.filter(msg => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      msg.name?.toLowerCase().includes(query) ||
      msg.email?.toLowerCase().includes(query) ||
      msg.phone?.toLowerCase().includes(query) ||
      msg.subject?.toLowerCase().includes(query) ||
      msg.message?.toLowerCase().includes(query) ||
      msg.status?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const paginatedData = filteredMessages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Contact Messages</h1>
        </div>
      </div>

      <div className="content-card">
        {showTable ? (
          <>
            {loading ? (
              <Loader size="large" />
            ) : (
              <>
                <h2 className="content-card-title">Contact Messages</h2>
                <Table columns={columns} data={paginatedData} onDelete={handleDelete} onEdit={handleEdit} />
                {totalPages > 1 && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
              </>
            )}
          </>
        ) : (
          <Modal isOpen={isModalOpen} onClose={handleBack} title="Update Message Status" inline>
            <form onSubmit={handleStatusUpdate} className="application-status-form">
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
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

