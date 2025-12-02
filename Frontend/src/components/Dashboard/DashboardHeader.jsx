'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import '@/styles/components/Dashboard/DashboardHeader.css';

export default function DashboardHeader({ currentPage, onPageChange, onSearch }) {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showSiteUpdateDropdown, setShowSiteUpdateDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const messagesRef = useRef(null);
  const siteUpdateRef = useRef(null);
  const businessRef = useRef(null);

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
      if (siteUpdateRef.current && !siteUpdateRef.current.contains(event.target)) {
        setShowSiteUpdateDropdown(false);
      }
      if (businessRef.current && !businessRef.current.contains(event.target)) {
        setShowBusinessDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch && e.target.value) {
      onSearch(e.target.value);
    }
  };

  const siteUpdateItems = [
    { label: 'Blog', page: 'blog' },
    { label: 'Project', page: 'case-study' },
    { label: 'Position', page: 'position' },
    { label: 'Team', page: 'team' },
    { label: 'SEO', page: 'seo' },
    { label: 'Users', page: 'users' }
  ];

  const handleLogout = () => {
    setShowProfileDropdown(false);
    logout();
  };

  const notifications = [
    { id: 1, title: 'Lorem ipsum', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '12:45 PM' },
    { id: 2, title: 'Lorem ipsum', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '12:45 PM' },
    { id: 3, title: 'Lorem ipsum', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '12:45 PM' },
    { id: 4, title: 'Lorem ipsum', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '12:45 PM' },
    { id: 5, title: 'Lorem ipsum', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '12:45 PM' }
  ];

  const messages = [
    { id: 1, email: 'loremipsum@gmail.com', time: '12:45 PM', unread: true },
    { id: 2, email: 'loremipsum@gmail.com', time: '12:45 PM', unread: true },
    { id: 3, email: 'loremipsum@gmail.com', time: '12:45 PM', unread: true },
    { id: 4, email: 'loremipsum@gmail.com', time: '12:45 PM', unread: false },
    { id: 5, email: 'loremipsum@gmail.com', time: '12:45 PM', unread: false }
  ];

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
        
        <div className="nav-item-dropdown" ref={siteUpdateRef}>
          <button
            className={`nav-item ${siteUpdateItems.some(item => item.page === currentPage) ? 'active' : ''}`}
            onClick={() => setShowSiteUpdateDropdown(!showSiteUpdateDropdown)}
          >
            Site Update
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {showSiteUpdateDropdown && (
            <div className="dropdown-menu">
              {siteUpdateItems.map((item) => (
                <button
                  key={item.page}
                  className={`dropdown-item ${currentPage === item.page ? 'active' : ''}`}
                  onClick={() => {
                    onPageChange(item.page);
                    setShowSiteUpdateDropdown(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="nav-item-dropdown" ref={businessRef}>
          <button
            className={`nav-item ${['application', 'contact', 'privacy-policy', 'terms-of-service'].includes(currentPage) ? 'active' : ''}`}
            onClick={() => setShowBusinessDropdown(!showBusinessDropdown)}
          >
            Business
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {showBusinessDropdown && (
            <div className="dropdown-menu">
              <button
                className={`dropdown-item ${currentPage === 'application' ? 'active' : ''}`}
                onClick={() => {
                  onPageChange('application');
                  setShowBusinessDropdown(false);
                }}
              >
                Applications
              </button>
              <button
                className={`dropdown-item ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => {
                  onPageChange('contact');
                  setShowBusinessDropdown(false);
                }}
              >
                Contact Messages
              </button>
              <button
                className={`dropdown-item ${currentPage === 'privacy-policy' ? 'active' : ''}`}
                onClick={() => {
                  onPageChange('privacy-policy');
                  setShowBusinessDropdown(false);
                }}
              >
                Privacy Policy
              </button>
              <button
                className={`dropdown-item ${currentPage === 'terms-of-service' ? 'active' : ''}`}
                onClick={() => {
                  onPageChange('terms-of-service');
                  setShowBusinessDropdown(false);
                }}
              >
                Terms of Service
              </button>
            </div>
          )}
        </div>
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
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>

        <div className="messages-dropdown" ref={messagesRef}>
          <button
            className="header-icon-btn"
            onClick={() => setShowMessages(!showMessages)}
            title="Messages"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 4.16667V13.3333C17.5 14.2538 16.7538 15 15.8333 15H5.83333L2.5 18.3333V4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5H15.8333C16.7538 2.5 17.5 3.24619 17.5 4.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="icon-badge">{messages.filter(m => m.unread).length}</span>
          </button>
          {showMessages && (
            <div className="messages-panel">
              <div className="messages-header">
                <span>email N... ({messages.length})</span>
              </div>
              <div className="messages-list">
                {messages.map((message) => (
                  <div key={message.id} className={`message-item ${message.unread ? 'unread' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10C11.8409 10 13.3333 8.50762 13.3333 6.66667C13.3333 4.82572 11.8409 3.33333 10 3.33333C8.15905 3.33333 6.66667 4.82572 6.66667 6.66667C6.66667 8.50762 8.15905 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.5 16.6667C17.5 13.9052 14.1421 11.6667 10 11.6667C5.85786 11.6667 2.5 13.9052 2.5 16.6667V18.3333H17.5V16.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="message-content">
                      <div className="message-email">{message.email}</div>
                    </div>
                    <div className="message-time">{message.time}</div>
                  </div>
                ))}
              </div>
              <div className="messages-actions">
                <button className="messages-btn read-all">Read All</button>
                <button className="messages-btn view-all">View All</button>
              </div>
            </div>
          )}
        </div>

        <div className="notification-dropdown" ref={notificationRef}>
          <button
            className="header-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.4417 17.5C11.1435 17.8313 10.7656 18.0833 10.3433 18.2337C9.92099 18.3841 9.46618 18.4282 9.02333 18.3621C8.58048 18.296 8.16312 18.1218 7.80948 17.8554C7.45585 17.589 7.17673 17.2387 6.99667 16.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="icon-badge">{notifications.length}</span>
          </button>
          {showNotifications && (
            <div className="notification-panel">
              <div className="notification-header">
                <span>Notification ({notifications.length})</span>
              </div>
              <div className="notification-list">
                {notifications.map((notification) => (
                  <div key={notification.id} className="notification-item">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10C11.8409 10 13.3333 8.50762 13.3333 6.66667C13.3333 4.82572 11.8409 3.33333 10 3.33333C8.15905 3.33333 6.66667 4.82572 6.66667 6.66667C6.66667 8.50762 8.15905 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.5 16.6667C17.5 13.9052 14.1421 11.6667 10 11.6667C5.85786 11.6667 2.5 13.9052 2.5 16.6667V18.3333H17.5V16.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="notification-content">
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-message">{notification.message}</div>
                    </div>
                    <div className="notification-time">{notification.time}</div>
                  </div>
                ))}
              </div>
              <div className="notification-actions">
                <button className="notification-btn read-all">Read All</button>
                <button className="notification-btn view-all">View All</button>
              </div>
            </div>
          )}
        </div>

        <div className="profile-dropdown" ref={profileRef}>
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
                className="profile-menu-item"
                onClick={handleLogout}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L17.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 10H5.83333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.83333 2.5H9.16667C10.0871 2.5 10.8333 3.24619 10.8333 4.16667V15.8333C10.8333 16.7538 10.0871 17.5 9.16667 17.5H5.83333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

