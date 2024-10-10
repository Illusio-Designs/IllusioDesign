// src/utils/axiosInstance.js
import axios from 'axios';
import { API_BASE_URL } from '../config'; // Ensure you have a config file with the base URL

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: API_BASE_URL, // e.g., 'http://localhost:5000/api'
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable sending cookies with every request
});

// Function to log in a user
export const loginUser = async (email, password) => {
    try {
        const response = await api.post(`/login`, {
            email,
            password,
        });
        return response.data; // Return the response data
    } catch (error) {
        throw error.response?.data?.error || 'Login failed'; // Throw the error message
    }
};

// Function to register a user
export const registerUser = async (name, email, password) => {
    try {
        const response = await api.post(`/register`, {
            name,
            email,
            password,
        });
        return response.data; // Return the response data
    } catch (error) {
        throw error.response?.data?.error || 'Registration failed'; // Throw the error message
    }
};

export default api;
