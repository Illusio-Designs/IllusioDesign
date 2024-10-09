// src/pages/Login.js
import React, { useState } from 'react';
import { loginUser } from '../utils/Loginapi'; // Import the loginUser function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await loginUser(email, password); // Call the API service
            console.log('User logged in:', response);
            // Redirect to dashboard or home page
            navigate('/dashboard'); // Redirect to dashboard
        } catch (err) {
            setError(err); // Set the error message
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Redirect to register page
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
                <button onClick={handleRegister}>Register</button> {/* Button to redirect to register page */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;