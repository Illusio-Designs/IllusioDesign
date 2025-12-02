import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { authAPI } from '@/services/api';
import { toast } from 'react-toastify';
import '@/styles/pages/Dashboard/Auth.css';
import Image from 'next/image';

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: ''
  });

  useEffect(() => {
    // Clear form on mount
    setFormData({
      username: '',
      email: '',
      password: '',
      rePassword: ''
    });
    setError('');
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.rePassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const result = await authAPI.register(
        formData.username,
        formData.email,
        formData.password
      );

      if (result.user && result.token) {
        // Auto-login after registration
        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('auth_user', JSON.stringify(result.user));
        
        // Redirect to dashboard - AuthContext will pick up the user on next render
        window.location.href = '/dashboard';
      } else if (result.user) {
        // Registration successful but no token, redirect to login
        toast.success('Registration successful! Please login with your credentials.');
        router.push('/login');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
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
          <h2 className="auth-title">Sign up</h2>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10C11.8409 10 13.3333 8.50762 13.3333 6.66667C13.3333 4.82572 11.8409 3.33333 10 3.33333C8.15905 3.33333 6.66667 4.82572 6.66667 6.66667C6.66667 8.50762 8.15905 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 16.6667C17.5 13.9052 14.1421 11.6667 10 11.6667C5.85786 11.6667 2.5 13.9052 2.5 16.6667V18.3333H17.5V16.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                name="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

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

          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8333 9.16667V5.83333C15.8333 3.53215 13.9681 1.66667 11.6667 1.66667H8.33333C6.03195 1.66667 4.16667 3.53215 4.16667 5.83333V9.16667M15.8333 9.16667H4.16667M15.8333 9.16667V15.8333C15.8333 17.134 14.634 18.3333 13.3333 18.3333H6.66667C5.36596 18.3333 4.16667 17.134 4.16667 15.8333V9.16667M10 13.3333V15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type={showRePassword ? 'text' : 'password'}
                name="rePassword"
                placeholder="Re-Password"
                value={formData.rePassword}
                onChange={handleChange}
                required
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowRePassword(!showRePassword)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {showRePassword ? (
                    <path d="M2.5 2.5L17.5 17.5M8.33333 8.33333C7.89131 8.77535 7.66667 9.375 7.66667 10C7.66667 10.625 7.89131 11.2246 8.33333 11.6667M8.33333 8.33333L11.6667 11.6667M8.33333 8.33333L5.83333 5.83333M11.6667 11.6667C12.1087 11.2246 12.3333 10.625 12.3333 10C12.3333 9.375 12.1087 8.77535 11.6667 8.33333M11.6667 11.6667L14.1667 14.1667M5.83333 5.83333C4.5 6.83333 3.33333 8.33333 2.5 10C3.33333 11.6667 4.5 13.1667 5.83333 14.1667M5.83333 5.83333L2.5 2.5M14.1667 14.1667C15.5 13.1667 16.6667 11.6667 17.5 10C16.6667 8.33333 15.5 6.83333 14.1667 5.83333M14.1667 14.1667L17.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  ) : (
                    <path d="M2.5 10C3.33333 11.6667 4.5 13.1667 5.83333 14.1667C7.16667 15.1667 8.66667 15.8333 10 15.8333C11.3333 15.8333 12.8333 15.1667 14.1667 14.1667C15.5 13.1667 16.6667 11.6667 17.5 10C16.6667 8.33333 15.5 6.83333 14.1667 5.83333C13.3333 4.83333 11.8333 4.16667 10 4.16667C8.16667 4.16667 6.66667 4.83333 5.83333 5.83333C4.5 6.83333 3.33333 8.33333 2.5 10ZM10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message" style={{ 
              color: '#ef4444', 
              fontSize: '14px', 
              marginBottom: '12px',
              padding: '12px',
              backgroundColor: '#fef2f2',
              borderRadius: '8px',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Get Start'}
          </button>

          <div className="auth-switch">
            <p>If you have account, <button type="button" className="auth-switch-link" onClick={() => router.push('/login')}>Login</button></p>
          </div>
        </form>
      </div>
    </div>
  );
}

