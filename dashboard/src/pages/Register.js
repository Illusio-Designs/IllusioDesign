import React, { useState } from 'react';
import { registerUser } from '../utils/Loginapi'; // Import the registerUser function from UserApi
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting

const Register = () => {
    const [username, setUsername] = useState(''); // Username for the new user
    const [email, setEmail] = useState(''); // Email of the new user
    const [password, setPassword] = useState(''); // Password for the new user
    const [userImage, setUserImage] = useState(null); // State for user image file
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Reset error state

        const formData = new FormData(); // Create a new FormData object
        formData.append('username', username); // Append username to formData
        formData.append('email', email); // Append email to formData
        formData.append('password', password); // Append password to formData
        if (userImage) {
            formData.append('userImage', userImage); // Append user image file to formData
        }

        // Log the FormData content for debugging
        console.log('Form Data to be sent:', {
            username,
            email,
            password,
            userImage: userImage ? userImage.name : null, // Log the filename or null if no image
        });

        try {
            const response = await registerUser(formData); // Call the API utility function with formData
            console.log('User registered:', response); // Log the response from server
            navigate('/'); // Redirect to login page
        } catch (err) {
            console.error('Registration error:', err); // Log the error for debugging
            setError(err); // Set the error message if registration fails
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>User Image:</label>
                    <input type="file" accept="image/*" onChange={(e) => setUserImage(e.target.files[0])} required />
                </div>
                <button type="submit">Create User</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p>If you have already registered, please <a href="/">go to login</a>.</p>
            </form>
        </div>
    );
};

export default Register;
