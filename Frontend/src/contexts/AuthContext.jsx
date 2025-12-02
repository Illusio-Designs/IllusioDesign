'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

import API_BASE_URL, { authAPI } from '@/services/api';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/private/dashboard/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok && response.status === 401) {
        return false;
      }
      return response.ok;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  };

  useEffect(() => {
    // Check for existing session on mount
    // Only verify token if we're on a dashboard/protected route
    const token = localStorage.getItem(TOKEN_KEY);
    const userData = localStorage.getItem(USER_KEY);
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        
        // Check if we're on a dashboard route
        const isDashboardRoute = typeof window !== 'undefined' && 
          window.location.pathname.startsWith('/dashboard');
        
        if (isDashboardRoute) {
          // Only verify token on dashboard routes
          verifyToken(token).then(isValid => {
            if (isValid) {
              setUser(parsedUser);
            } else {
              clearAuth();
              if (typeof window !== 'undefined') {
                window.location.href = '/login';
              }
            }
            setLoading(false);
          });
        } else {
          // On public pages, just set user from localStorage without API call
          setUser(parsedUser);
          setLoading(false);
        }
      } catch (error) {
        clearAuth();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);

      if (data.token && data.user) {
        // Allow all authenticated users to login
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed. Please check your credentials.' };
      }
    } catch (error) {
      // Network error or CORS issue
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return { 
          success: false, 
          error: `Cannot connect to server. Please ensure the backend is running at ${API_BASE_URL}` 
        };
      }
      return { success: false, error: error.message || 'Login failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      // Call logout API
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        try {
          await authAPI.logout();
          toast.success('Logged out successfully');
        } catch (error) {
          // Even if API call fails, continue with local logout
          console.error('Logout API error:', error);
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage and redirect
      clearAuth();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  };

  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  const isAuthenticated = () => {
    return !!user && !!getToken();
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Check token expiration periodically (only on dashboard routes)
  useEffect(() => {
    if (!user) return;

    // Only check if we're on a dashboard route
    const isDashboardRoute = typeof window !== 'undefined' && 
      window.location.pathname.startsWith('/dashboard');
    
    if (!isDashboardRoute) return;

    const checkTokenExpiration = async () => {
      const token = getToken();
      if (token) {
        const isValid = await verifyToken(token);
        if (!isValid) {
          clearAuth();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }
    };

    // Check every 5 minutes (only on dashboard routes)
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        getToken,
        isAuthenticated,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
