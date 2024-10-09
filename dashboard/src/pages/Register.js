import React, { useState } from 'react';
import { registerUser } from '../utils/Loginapi'; // Import the registerUser function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await registerUser(name, email, password); // Call the API utility function
            console.log('User registered:', response);
            // Redirect to login or dashboard
            navigate('/login'); // Redirect to login page
        } catch (err) {
            setError(err); // Set the error message
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p>If you have already registered, please <a href="/login">go to login</a>.</p>
            </form>
        </div>
    );
};

export default Register;
