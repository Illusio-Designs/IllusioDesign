// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginUser } from '../utils/Loginapi'; // Correctly import loginUser from axiosInstance

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
            // Redirect to the dashboard after successful login
            navigate('/dashboard'); // Redirect to the dashboard
        } catch (err) {
            setError(err); // Set the error message
            console.error('Login failed:', err);
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Redirect to the register page
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
                <button type="button" onClick={handleRegister}>Register</button> {/* Button to redirect to register page */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
