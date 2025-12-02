'use client';

import { useState, useEffect, useRef } from 'react';
import { contactAPI } from '@/services/api';
import { toast } from 'react-toastify';
import Table from '@/components/common/Table';
import Pagination from '@/components/common/Pagination';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/Contact.css';

export default function Contact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchMessages();
  }, [currentPage]);

  const fetchMessages = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await contactAPI.getAll();
      if (result.data) {
        setMessages(result.data);
        setTotalPages(Math.ceil(result.data.length / itemsPerPage));
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

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'subject', label: 'Subject' },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Date', render: (value) => value ? new Date(value).toISOString().split('T')[0] : 'N/A' }
  ];

  const paginatedData = messages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="page-header-left">
          <button className="back-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <h1 className="page-title">Contact Messages</h1>
        </div>
      </div>

      <div className="content-card">
        <h2 className="content-card-title">Contact Messages</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <Table columns={columns} data={paginatedData} onDelete={handleDelete} onEdit={null} />
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

