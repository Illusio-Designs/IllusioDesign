'use client';

import { useState } from 'react';
import '@/styles/pages/Dashboard/Auth.css';
import Image from 'next/image';

export default function Login({ navigateTo }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted', formData);
  };

  const handleSocialLogin = (provider) => {
    // Handle social login logic here
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-form-header">
          <div className="auth-logo">
            <Image 
              src="/images/IllusioDesignLogoicon.webp" 
              alt="Illusio Design Logo" 
              width={40} 
              height={40} 
            />
          </div>
          <h2 className="auth-title">Sign in with email</h2>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 6.66667L10 11.6667L17.5 6.66667M3.33333 15H16.6667C17.5871 15 18.3333 14.2538 18.3333 13.3333V6.66667C18.3333 5.74619 17.5871 5 16.6667 5H3.33333C2.41286 5 1.66667 5.74619 1.66667 6.66667V13.3333C1.66667 14.2538 2.41286 15 3.33333 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8333 9.16667V5.83333C15.8333 3.53215 13.9681 1.66667 11.6667 1.66667H8.33333C6.03195 1.66667 4.16667 3.53215 4.16667 5.83333V9.16667M15.8333 9.16667H4.16667M15.8333 9.16667V15.8333C15.8333 17.134 14.634 18.3333 13.3333 18.3333H6.66667C5.36596 18.3333 4.16667 17.134 4.16667 15.8333V9.16667M10 13.3333V15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {showPassword ? (
                    <path d="M2.5 2.5L17.5 17.5M8.33333 8.33333C7.89131 8.77535 7.66667 9.375 7.66667 10C7.66667 10.625 7.89131 11.2246 8.33333 11.6667M8.33333 8.33333L11.6667 11.6667M8.33333 8.33333L5.83333 5.83333M11.6667 11.6667C12.1087 11.2246 12.3333 10.625 12.3333 10C12.3333 9.375 12.1087 8.77535 11.6667 8.33333M11.6667 11.6667L14.1667 14.1667M5.83333 5.83333C4.5 6.83333 3.33333 8.33333 2.5 10C3.33333 11.6667 4.5 13.1667 5.83333 14.1667M5.83333 5.83333L2.5 2.5M14.1667 14.1667C15.5 13.1667 16.6667 11.6667 17.5 10C16.6667 8.33333 15.5 6.83333 14.1667 5.83333M14.1667 14.1667L17.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  ) : (
                    <path d="M2.5 10C3.33333 11.6667 4.5 13.1667 5.83333 14.1667C7.16667 15.1667 8.66667 15.8333 10 15.8333C11.3333 15.8333 12.8333 15.1667 14.1667 14.1667C15.5 13.1667 16.6667 11.6667 17.5 10C16.6667 8.33333 15.5 6.83333 14.1667 5.83333C13.3333 4.83333 11.8333 4.16667 10 4.16667C8.16667 4.16667 6.66667 4.83333 5.83333 5.83333C4.5 6.83333 3.33333 8.33333 2.5 10ZM10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <button type="button" className="forgot-password-link">
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="auth-submit-btn">
            Get Start
          </button>

          <div className="social-auth-divider">
            <span>Or sign in with</span>
          </div>

          <div className="social-auth-buttons">
            <button
              type="button"
              className="social-btn"
              onClick={() => handleSocialLogin('google')}
            >
              <span className="social-btn-text">G</span>
            </button>
            <button
              type="button"
              className="social-btn"
              onClick={() => handleSocialLogin('facebook')}
            >
              <span className="social-btn-text">f</span>
            </button>
            <button
              type="button"
              className="social-btn"
              onClick={() => handleSocialLogin('apple')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 6.5C15.4 6.5 15.3 6.5 15.2 6.5C14.9 5.4 14.3 4.4 13.4 3.7C12.6 3.1 11.6 2.8 10.6 2.8C9.9 2.8 9.3 3 8.8 3.2C8.5 3.3 8.2 3.5 8 3.6C7.8 3.7 7.5 3.8 7.2 3.8C6.8 3.8 6.4 3.7 6.1 3.5C5.7 3.2 5.2 3 4.7 3C3.6 3 2.6 3.6 2 4.5C1.1 5.8 0.5 7.5 0.7 9.3C0.9 11.5 1.6 13.6 2.7 15.4C3.5 16.7 4.4 18.1 5.6 18.9C6.3 19.4 7.1 19.7 7.9 19.7C8.4 19.7 8.9 19.6 9.3 19.4C9.8 19.2 10.3 19.1 10.8 19.1C11.4 19.1 11.9 19.2 12.3 19.4C12.8 19.6 13.3 19.7 13.8 19.7C14.6 19.7 15.4 19.4 16.1 18.9C17.4 18 18.2 16.5 18.9 15.1C17.7 14.5 16.8 13.4 16.8 12.1C16.8 11.1 17.3 10.2 18 9.7C17.2 8.8 16.2 8.2 15.1 8.1C15 7.1 14.6 6.2 14 5.5C13.5 4.9 12.8 4.5 12 4.3C12.2 4.1 12.4 3.9 12.6 3.7C13.4 2.9 14.4 2.4 15.5 2.4C15.5 3.4 15.2 4.3 14.6 5C15.1 5.1 15.5 5.3 15.9 5.6C16.6 6.1 17.1 6.8 17.4 7.6C16.9 7.3 16.3 7.1 15.6 7.1C15.6 6.9 15.5 6.7 15.5 6.5Z"/>
              </svg>
            </button>
          </div>

          <div className="auth-switch">
            <p>If you don&apos;t have account, <button type="button" className="auth-switch-link" onClick={() => navigateTo('register')}>Register</button></p>
          </div>
        </form>
      </div>
    </div>
  );
}

