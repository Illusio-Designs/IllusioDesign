'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiMaximize, FiMinimize } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useSearch } from '@/contexts/SearchContext';
import { contactAPI, applicationAPI } from '@/services/api';
import Tooltip from '@/components/common/Tooltip';
import '@/styles/components/Dashboard/DashboardHeader.css';

export default function DashboardHeader({ currentPage, onPageChange, onSidebarToggle }) {
  const { searchQuery, updateSearch } = useSearch();
  const { logout, user } = useAuth();
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [contactMessages, setContactMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [applications, setApplications] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setShowMessages(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Fetch contact messages
  useEffect(() => {
    fetchContactMessages();
    // Refresh every 30 seconds
    const interval = setInterval(fetchContactMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch applications
  useEffect(() => {
    fetchApplications();
    // Refresh every 30 seconds
    const interval = setInterval(fetchApplications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchContactMessages = async () => {
    try {
      const result = await contactAPI.getAll();
      if (result.data) {
        // Get latest 5 messages
        const latestMessages = result.data.slice(0, 5);
        setContactMessages(latestMessages);
        
        // Count unread messages
        const unread = result.data.filter(msg => msg.status === 'unread').length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Error fetching contact messages:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const result = await applicationAPI.getAll();
      if (result.data) {
        // Get latest 5 applications
        const latestApplications = result.data.slice(0, 5);
        setApplications(latestApplications);
        
        // Count pending applications
        const pending = result.data.filter(app => app.status === 'pending').length;
        setPendingCount(pending);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearch(localSearchQuery);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    updateSearch(value);
  };

  // Sync local search with context when it changes externally
  useEffect(() => {
    if (searchQuery !== localSearchQuery) {
      setLocalSearchQuery(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Site update items for reference (used in sidebar)
  const siteUpdateItems = [
    { label: 'Blog', page: 'blog' },
    { label: 'Project', page: 'case-study' },
    { label: 'Position', page: 'position' },
    { label: 'Team', page: 'team' },
    { label: 'SEO', page: 'seo' },
    { label: 'Users', page: 'users' },
    { label: 'Reviews', page: 'reviews' }
  ];

  const handleLogout = () => {
    setShowProfileDropdown(false);
    logout();
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await contactAPI.update(messageId, { status: 'read' });
      fetchContactMessages();
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const handleNotificationClick = (type, id) => {
    setShowNotifications(false);
    if (onPageChange) {
      if (type === 'application') {
        onPageChange('application');
      } else if (type === 'message') {
        handleMarkAsRead(id);
        onPageChange('contact');
      }
    }
  };

  const handleViewAllMessages = () => {
    setShowMessages(false);
    if (onPageChange) {
      onPageChange('contact');
    }
  };

  const handleViewAllApplications = () => {
    setShowNotifications(false);
    if (onPageChange) {
      onPageChange('application');
    }
  };

  const totalNotificationCount = pendingCount + unreadCount;

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <Image
          src="/images/IllusioDesignfulllogo.webp"
          alt="Illusio Design Logo"
          width={150}
          height={40}
          className="header-logo"
        />
      </div>

      <nav className="header-nav">
        <button
          className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => onPageChange('dashboard')}
        >
          Home
        </button>
        
        <button
          className={`nav-item ${siteUpdateItems.some(item => item.page === currentPage) ? 'active' : ''}`}
          onClick={() => onSidebarToggle && onSidebarToggle('site-update')}
        >
          Site Update
        </button>

        <button
          className={`nav-item ${['application', 'contact', 'privacy-policy', 'terms-of-service'].includes(currentPage) ? 'active' : ''}`}
          onClick={() => onSidebarToggle && onSidebarToggle('business')}
        >
          Business
        </button>
      </nav>

      <div className="header-right">
        <form className="search-form" onSubmit={handleSearch}>
          <button type="submit" className="search-icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.5 17.5L13.875 13.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={localSearchQuery}
            onChange={handleSearchChange}
          />
        </form>

        <Tooltip text={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"} position="bottom">
          <button
            className="header-icon-btn"
            onClick={handleToggleFullscreen}
          >
            {isFullscreen ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
          </button>
        </Tooltip>

        <div className="notification-dropdown" ref={notificationRef}>
          <Tooltip text="Notifications" position="bottom">
            <button
              className="header-icon-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.4417 17.5C11.1435 17.8313 10.7656 18.0833 10.3433 18.2337C9.92099 18.3841 9.46618 18.4282 9.02333 18.3621C8.58048 18.296 8.16312 18.1218 7.80948 17.8554C7.45585 17.589 7.17673 17.2387 6.99667 16.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {totalNotificationCount > 0 && <span className="icon-badge">{totalNotificationCount}</span>}
          </button>
          </Tooltip>
          {showNotifications && (
            <div className="notification-panel">
              <div className="notification-header">
                <span>Notifications ({applications.length + contactMessages.length})</span>
              </div>
              <div className="notification-list">
                {applications.length === 0 && contactMessages.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                    No notifications yet
                  </div>
                ) : (
                  <>
                    {applications.map((application) => (
                      <div 
                        key={`app-${application.id}`} 
                        className={`notification-item ${application.status === 'pending' ? 'unread' : ''}`}
                        onClick={() => handleNotificationClick('application', application.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 10C11.8409 10 13.3333 8.50762 13.3333 6.66667C13.3333 4.82572 11.8409 3.33333 10 3.33333C8.15905 3.33333 6.66667 4.82572 6.66667 6.66667C6.66667 8.50762 8.15905 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17.5 16.6667C17.5 13.9052 14.1421 11.6667 10 11.6667C5.85786 11.6667 2.5 13.9052 2.5 16.6667V18.3333H17.5V16.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="notification-content">
                          <div className="notification-title">{application.name}</div>
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                            {application.position ? application.position.title : 'No position specified'}
                          </div>
                        </div>
                        <div className="notification-time">{formatTime(application.createdAt)}</div>
                      </div>
                    ))}
                    {contactMessages.map((message) => (
                      <div 
                        key={`msg-${message.id}`} 
                        className={`notification-item ${message.status === 'unread' ? 'unread message-unread' : ''}`}
                        onClick={() => handleNotificationClick('message', message.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5 4.16667V13.3333C17.5 14.2538 16.7538 15 15.8333 15H5.83333L2.5 18.3333V4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5H15.8333C16.7538 2.5 17.5 3.24619 17.5 4.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="notification-content">
                          <div className="notification-title">{message.email}</div>
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                            {message.subject}
                          </div>
                        </div>
                        <div className="notification-time">{formatTime(message.createdAt)}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="notification-actions">
                <button 
                  className="notification-btn view-all" 
                  onClick={() => {
                    setShowNotifications(false);
                    if (onPageChange) {
                      onPageChange('application');
                    }
                  }}
                >
                  View All
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="profile-dropdown" ref={profileRef}>
          <Tooltip text="Profile" position="bottom">
            <button
              className="profile-btn"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="profile-avatar"
              />
            ) : (
              <div className="profile-initials">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
              </div>
            )}
          </button>
          </Tooltip>
          {showProfileDropdown && (
            <div className={`profile-menu ${showProfileDropdown ? 'show' : ''}`}>
              <div className="profile-menu-header">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="profile-menu-avatar"
                  />
                ) : (
                  <div className="profile-menu-initials">
                    {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                  </div>
                )}
                <div className="profile-menu-name">{user?.name || 'John Doe'}</div>
              </div>
              <button
                className={`profile-menu-item ${currentPage === 'profile' ? 'active' : ''}`}
                onClick={() => {
                  onPageChange('profile');
                  setShowProfileDropdown(false);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10C11.8409 10 13.3333 8.50762 13.3333 6.66667C13.3333 4.82572 11.8409 3.33333 10 3.33333C8.15905 3.33333 6.66667 4.82572 6.66667 6.66667C6.66667 8.50762 8.15905 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 16.6667C17.5 13.9052 14.1421 11.6667 10 11.6667C5.85786 11.6667 2.5 13.9052 2.5 16.6667V18.3333H17.5V16.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                My Profile
              </button>
              <button
                className="profile-menu-item logout-item"
                onClick={handleLogout}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L17.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

