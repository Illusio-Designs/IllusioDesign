import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import DefaultLayout from './components/DefaultLayout';
import Team from './pages/Team';
import Projects from './pages/Project';
import Blog from './pages/Blog';
import Referral from './pages/Referral';
import Booking from './pages/Booking';
import Slider from './pages/Slider';
import api from './utils/Loginapi'; // Your axios instance for API requests

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the user is logged in by checking the token in localStorage
  useEffect(() => {
    const checkUserLoggedIn = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token); // Set authentication based on token presence
      setLoading(false); // Stop loading once the token check is done
    };
    checkUserLoggedIn();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/team" element={<ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} component={Team} />} />
        <Route path="/slider" element={<ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} component={Slider} />} />
        <Route path="/projects" element={<ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} component={Projects} />} />
        <Route path="/blog" element={<ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} component={Blog} />} />
        <Route path="/referral" element={<ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} component={Referral} />} />
        <Route path="/booking" element={<ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} component={Booking} />} />

        {/* 404 Route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

// Create a separate component for protected routes
const ProtectedRoute = ({ isAuthenticated, setIsAuthenticated, component: Component }) => {
  const navigate = useNavigate();

  const logout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found. User is already logged out.');
      setIsAuthenticated(false);
      return;
    }

    try {
      console.log('Logging out...');
      await api.post(`/users/logout`);
      localStorage.removeItem('token'); // Ensure the token is cleared
      setIsAuthenticated(false);
      console.log('Logout successful. Token removed.');
      navigate('/'); // Use navigate for redirection
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
      if (error.response?.status === 403) {
        console.error('Token may be invalid or expired. Please log in again.');
        localStorage.removeItem('token'); // Clear the invalid token
        setIsAuthenticated(false);
        navigate('/'); // Redirect to login
      }
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <DefaultLayout logout={logout}>
      {Component ? <Component /> : <h1>Welcome to the Dashboard</h1>}
    </DefaultLayout>
  );
};

export default App;
