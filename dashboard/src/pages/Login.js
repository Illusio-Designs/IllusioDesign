// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/Loginapi';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState(''); // Using email instead of username
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await loginUser(email, password); // Call loginUser with email
            console.log('API Response:', response);
            localStorage.setItem('user', JSON.stringify(response.user)); // Store user data in local storage
            console.log('User data stored in local storage:', response.user);
            setIsAuthenticated(true);
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (err) {
            console.error('Error response:', err);
            setError(err || 'Login failed'); // Handle login error
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Navigate to register page
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
                <button type="button" onClick={handleRegister}>Register</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
