'use client';

import { useState, useEffect } from 'react';
import { userAPI } from '@/services/api';
import { toast } from 'react-toastify';
import { useSearch } from '@/contexts/SearchContext';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Loader from '@/components/common/Loader';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/Users.css';

export default function Users() {
  const { searchQuery } = useSearch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    role: 'user'
  };
  const [formData, setFormData] = useState(initialFormData);

  const itemsPerPage = 8;

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await userAPI.getAll();
      if (result.data) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingUser(null);
    setShowPassword(false);
    setFormData(initialFormData);
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: '', // Don't pre-fill password for security
      role: user.role || 'user'
    });
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleBack = () => {
    resetForm();
    setShowTable(true);
    setIsModalOpen(false);
  };

  const handleDelete = async (user) => {
    if (!confirm(`Are you sure you want to delete user "${user.name || user.email}"?`)) return;
    
    try {
      await userAPI.delete(user.id);
      fetchUsers();
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // For update, only send fields that are provided (don't send empty password)
        const updateData = { ...formData };
        if (!updateData.password || updateData.password.trim() === '') {
          delete updateData.password;
        }
        await userAPI.update(editingUser.id, updateData);
        toast.success('User updated successfully');
      } else {
        // For create, password is required
        if (!formData.password || formData.password.trim() === '') {
          toast.error('Password is required for new users');
          return;
        }
        await userAPI.create(formData);
        toast.success('User created successfully');
      }
      
      resetForm();
      setIsModalOpen(false);
      setShowTable(true);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Failed to save user: ' + error.message);
    }
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'role', 
      label: 'Role',
      render: (value) => (
        <span className={`role-badge role-${value}`}>
          {value === 'user' ? 'Team Member' : value === 'admin' ? 'Admin' : value}
        </span>
      )
    },
    { 
      key: 'createdAt', 
      label: 'Created',
      render: (value) => value ? new Date(value).toLocaleDateString() : '-'
    }
  ];

  return (
    <div className="users-page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Users</h1>
        </div>
        {showTable && !loading && (
          <div className="page-header-right">
            <div className="page-add-button-wrapper">
              <button className="add-btn-inline" onClick={handleAdd}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Add New User</span>
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
                <h2 className="content-card-title">Users</h2>
                <Table
                  columns={columns}
                  data={paginatedUsers}
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
            title={editingUser ? 'Edit User' : 'Add User'}
            size="large"
            inline
          >
            <form onSubmit={handleSubmit} className="users-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={!!editingUser}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingUser}
                    placeholder={editingUser ? "Leave blank to keep current password" : "Enter password"}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 2.5L17.5 17.5M8.75 8.75C8.33679 9.16321 8.125 9.70893 8.125 10.25C8.125 11.333 9.042 12.25 10.125 12.25C10.6661 12.25 11.2118 12.0382 11.625 11.625M15.2083 13.3333C14.0333 14.1917 12.575 14.75 10.125 14.75C4.41667 14.75 1.25 10.25 1.25 10.25C2.125 8.91667 3.45833 7.58333 5.04167 6.45833M12.5 7.5C13.1667 8.16667 13.75 8.91667 14.1667 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.125 4.25C14.8333 4.25 18 8.75 18 8.75C18 8.75 14.8333 13.25 10.125 13.25C5.41667 13.25 2.25 8.75 2.25 8.75C2.25 8.75 5.41667 4.25 10.125 4.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.125 11.25C11.208 11.25 12.125 10.333 12.125 9.25C12.125 8.167 11.208 7.25 10.125 7.25C9.042 7.25 8.125 8.167 8.125 9.25C8.125 10.333 9.042 11.25 10.125 11.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  <option value="user">Team Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editingUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}

