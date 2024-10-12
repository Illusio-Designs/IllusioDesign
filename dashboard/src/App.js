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
import api from './utils/Loginapi'; // Adjust the import based on your structure

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state
    const [loading, setLoading] = useState(true); // Manage loading state

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const response = await api.get('/current_user'); // Check current user status
                console.log('Current user:', response.data); // Debugging log
                if (response.data) {
                    setIsAuthenticated(true); // User is authenticated
                }
            } catch (error) {
                console.warn('User not authenticated:', error); // Handle authentication error
                setIsAuthenticated(false); // User is not authenticated
            } finally {
                setLoading(false); // Stop loading
            }
        };

        checkUserLoggedIn(); // Call function to check user login status
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while checking authentication
    }

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> {/* Pass setIsAuthenticated */}
                <Route path="/dashboard" element={isAuthenticated ? <DefaultLayout><h1>Welcome to the Dashboard</h1></DefaultLayout> : <Navigate to="/" />} />
                <Route path="/team" element={isAuthenticated ? <DefaultLayout><Team /></DefaultLayout> : <Navigate to="/" />} />
                <Route path="/projects" element={isAuthenticated ? <DefaultLayout><Projects /></DefaultLayout> : <Navigate to="/" />} />
                <Route path="/blog" element={isAuthenticated ? <DefaultLayout><Blog /></DefaultLayout> : <Navigate to="/" />} />
                <Route path="/referral" element={isAuthenticated ? <DefaultLayout><Referral /></DefaultLayout> : <Navigate to="/" />} />
                <Route path="/booking" element={isAuthenticated ? <DefaultLayout><Booking /></DefaultLayout> : <Navigate to="/" />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
