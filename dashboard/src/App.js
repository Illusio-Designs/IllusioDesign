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

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state

    useEffect(() => {
        // Assuming there's a function to check if the user is authenticated
        const checkAuth = () => {
            // This is a placeholder for actual authentication logic
            // For demonstration, we'll set isAuthenticated to true after 1 second
            setTimeout(() => {
                setIsAuthenticated(true);
            }, 1000);
        };

        checkAuth();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<DefaultLayout><h1>Welcome to the Dashboard</h1></DefaultLayout>} />
                <Route path="/team" element={isAuthenticated ? <DefaultLayout><Team /></DefaultLayout> : <Navigate to="/login" />} />
                <Route path="/projects" element={isAuthenticated ? <DefaultLayout><Projects /></DefaultLayout> : <Navigate to="/login" />} />
                <Route path="/blog" element={isAuthenticated ? <DefaultLayout><Blog /></DefaultLayout> : <Navigate to="/login" />} />
                <Route path="/referral" element={isAuthenticated ? <DefaultLayout><Referral /></DefaultLayout> : <Navigate to="/login" />} />
                <Route path="/booking" element={isAuthenticated ? <DefaultLayout><Booking /></DefaultLayout> : <Navigate to="/login" />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
