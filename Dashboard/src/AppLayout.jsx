import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Import useAuth
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import config from './config';
import './styles/App.css';
import EditUser from './components/editUser';
import UserList from './pages/User';
import Project from './pages/Project';
import EditProject from './components/EditProject'; // Ensure the path is correct
import AddUser from './components/AddUser'; // Import the new AddUser component
import Blog from './pages/Blog';
import Proposal from './pages/Proposal';

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation(); // Get the current location

  // Check if the current path is one of the non-auth paths
  const isAuthPath = location.pathname === '/' || location.pathname === '/register' || location.pathname === '/login';

  return (
    <div className="app">
      {/* Render Header and Sidebar only if authenticated and not on auth paths */}
      {isAuthenticated && !isAuthPath && <Header title={config.appTitle} />}
      <div className="container">
        {isAuthenticated && !isAuthPath && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/home" 
              element={<ProtectedRoute element={<Home />} />} 
            />
            <Route 
              path="/user" 
              element={<ProtectedRoute element={<UserList />} />} 
            />
            <Route 
              path="/user/edit/:id" 
              element={<ProtectedRoute element={<EditUser />} />} 
            />
            <Route 
              path="/project" 
              element={<ProtectedRoute element={<Project />} />} 
            />
            <Route 
              path="/project/edit/:id" 
              element={<ProtectedRoute element={<EditProject />} />} 
            />
            <Route 
              path="/user/add" 
              element={<ProtectedRoute element={<AddUser />} />} 
            />
            <Route 
              path="/blog" 
              element={<ProtectedRoute element={<Blog />} />} 
            />
            <Route 
              path="/proposal"  
              element={<ProtectedRoute element={<Proposal />} />} 
            />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
