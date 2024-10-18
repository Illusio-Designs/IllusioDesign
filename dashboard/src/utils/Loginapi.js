import axios from 'axios';
import { API_BASE_URL } from '../config';

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable sending cookies with every request
});

// Function to log in a user
export const loginUser = async (email, password) => {
    try {
        const response = await api.post(`/users/login`, { email, password }); // Change username to email
        localStorage.setItem('token', response.data.token); // Store the token
        return response.data; // Return the response data
    } catch (error) {
        throw error.response?.data?.message || 'Login failed'; // Throw the error message
    }
};

// Function to register a user
export const registerUser = async (formData) => {
    try {
        const response = await api.post(`/users/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the Content-Type to multipart/form-data
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        throw error.response?.data?.message || 'Registration failed'; // Throw the error message
    }
};

// Function to log out a user
export const logoutUser = async () => {
    try {
        localStorage.removeItem('token');
        await api.post(`/users/logout`); // Optional logout request
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

// Export the Axios instance
export default api;
