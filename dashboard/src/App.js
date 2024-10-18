import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import DefaultLayout from './components/DefaultLayout';
import Team from './pages/Team';
import Projects from './pages/Project';
import Blog from './pages/Blog';
import Referral from './pages/Referral';
import Booking from './pages/Booking';
import Slider from './pages/Slider';
import api from './utils/Loginapi';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const token = localStorage.getItem('token');
            
            if (token) {
                try {
                    const response = await api.get('/current_user');
                    setIsAuthenticated(!!response.data);
                } catch (error) {
                    setIsAuthenticated(false);
                    localStorage.removeItem('token');
                }
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
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

    const PrivateRoute = ({ element }) => 
        isAuthenticated ? element : <Navigate to="/" replace />;

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/register" element={
                    isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
                } />
                <Route path="/" element={
                    isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />
                } />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <PrivateRoute element={
                        <DefaultLayout>
                            <h1>Welcome to the Dashboard</h1>
                        </DefaultLayout>
                    } />
                } />
                <Route path="/team" element={
                    <PrivateRoute element={
                        <DefaultLayout>
                            <Team />
                        </DefaultLayout>
                    } />
                } />
                <Route path="/slider" element={
                    <PrivateRoute element={
                        <DefaultLayout>
                            <Slider />
                        </DefaultLayout>
                    } />
                } />
                <Route path="/projects" element={
                    <PrivateRoute element={
                        <DefaultLayout>
                            <Projects />
                        </DefaultLayout>
                    } />
                } />
                <Route path="/blog" element={
                    <PrivateRoute element={
                        <DefaultLayout>
                            <Blog />
                        </DefaultLayout>
                    } />
                } />
                <Route path="/referral" element={
                    <PrivateRoute element={
                        <DefaultLayout>
                            <Referral />
                        </DefaultLayout>
                    } />
                } />
                <Route path="/booking" element={
                    <PrivateRoute element={
                        <DefaultLayout>
                            <Booking />
                        </DefaultLayout>
                    } />
                } />

                {/* 404 Route */}
                <Route path="*" element={
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <h1 className="text-4xl font-bold mb-4">404</h1>
                        <p className="text-xl mb-4">Page Not Found</p>
                        <button 
                            onClick={() => window.history.back()}
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                } />
            </Routes>
        </Router>
    );
};

export default App;