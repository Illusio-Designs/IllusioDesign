// src/utils/Loginapi.js

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
        const response = await api.post(`/login`, { email, password });
        console.log('Login response:', response); // Log the entire response for debugging
        // Check the structure of the response to find the token
        localStorage.setItem('token', response.data.token); // Store the token
        console.log('Token stored in localStorage:', response.data.token); // Log the stored token
        return response.data; // Return the response data
    } catch (error) {
        throw error.response?.data?.error || 'Login failed'; // Throw the error message
    }
};

// Function to register a user (can be expanded)
export const registerUser = async (name, email, password) => {
    try {
        const response = await api.post(`/register`, { name, email, password });
        return response.data; // Return the response data
    } catch (error) {
        throw error.response?.data?.error || 'Registration failed'; // Throw the error message
    }
};

// Export the Axios instance
export default api;
