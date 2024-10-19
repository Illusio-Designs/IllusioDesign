import axios from 'axios';
import { API_BASE_URL } from '../config';

// Create an Axios instance with the base URL and enable credentials
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Send cookies with each request
});

// Add a response interceptor to store the token upon login
api.interceptors.response.use(
    (response) => {
        if (response.data.token) {
            localStorage.setItem('token', response.data.token); // Store JWT token in localStorage
            console.log('Token stored:', response.data.token); // Log token storage
        }
        return response;
    },
    (error) => {
        // Handle 401 errors by removing the token
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token'); // Remove token if unauthorized
            console.log('Token removed due to unauthorized access'); // Log token removal
        }
        return Promise.reject(error);
    }
);

// Add a request interceptor to attach the JWT token to each request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
            console.log('Token attached to request:', token); // Log token attachment
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to log in a user
export const loginUser = async (email, password) => {
    try {
        const response = await api.post(`/users/login`, { email, password }); // Login request with email
        return response.data; // Return response data (including the token)
    } catch (error) {
        throw error.response?.data?.message || 'Login failed'; // Throw error if login fails
    }
};

// Function to register a user
export const registerUser = async (formData) => {
    try {
        const response = await api.post(`/users/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Handle multipart form data for user image upload
            },
        });
        return response.data; // Return response data after successful registration
    } catch (error) {
        throw error.response?.data?.message || 'Registration failed'; // Throw error if registration fails
    }
};

// Function to log out a user
export const logoutUser = async () => {
    try {
        console.log('Logging out...'); // Log when logout is initiated
        await api.post(`/users/logout`); // Call the logout API
        console.log('Logout successful'); // Log successful logout
    } catch (error) {
        console.error('Error during logout:', error); // Log any errors during logout
        throw error; // Re-throw the error for handling in the component
    }
};


// Export the Axios instance
export default api;
