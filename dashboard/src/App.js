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
import api from './utils/Loginapi'; // Adjust import based on your structure

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state
    const [loading, setLoading] = useState(true); // Manage loading state

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const token = localStorage.getItem('token'); // Check if token exists
            if (token) {
                try {
                    const response = await api.get('/current_user'); // Check current user status
                    console.log('Current user:', response.data); // Debugging log
                    if (response.data) {
                        setIsAuthenticated(true); // User is authenticated
                    }
                } catch (error) {
                    console.warn('User not authenticated:', error); // Handle authentication error
                    setIsAuthenticated(false); // User is not authenticated
                }
            } else {
                setIsAuthenticated(false); // No token means not authenticated
            }
            setLoading(false); // Stop loading
        };

        checkUserLoggedIn(); // Call function to check user login status
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while checking authentication
    }

    // Create a PrivateRoute component to simplify protected routes
    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/" />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> {/* Pass setIsAuthenticated */}
                
                {/* Protected routes */}
                <Route path="/dashboard" element={<PrivateRoute element={<DefaultLayout><h1>Welcome to the Dashboard</h1></DefaultLayout>} />} />
                <Route path="/team" element={<PrivateRoute element={<DefaultLayout><Team /></DefaultLayout>} />} />
                <Route path="/slider" element={<PrivateRoute element={<DefaultLayout><Slider /></DefaultLayout>} />} />
                <Route path="/projects" element={<PrivateRoute element={<DefaultLayout><Projects /></DefaultLayout>} />} />
                <Route path="/blog" element={<PrivateRoute element={<DefaultLayout><Blog /></DefaultLayout>} />} />
                <Route path="/referral" element={<PrivateRoute element={<DefaultLayout><Referral /></DefaultLayout>} />} />
                <Route path="/booking" element={<PrivateRoute element={<DefaultLayout><Booking /></DefaultLayout>} />} />

                {/* Catch-all route for 404 */}
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
