import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/Loginapi';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await loginUser(email, password);
            console.log('API Response:', response);
            localStorage.setItem('user', JSON.stringify(response.user)); // Store user data in local storage
            console.log('User data stored in local storage:', response.user);
            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (err) {
            console.error('Error response:', err.response);
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    const handleRegister = () => {
        navigate('/register');
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
