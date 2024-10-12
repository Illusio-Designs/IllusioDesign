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

// Add a request interceptor to include the Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors (e.g., unauthorized, server errors)
        if (error.response?.status === 401) {
            console.error('Unauthorized access');
            // You might want to dispatch an action to clear the auth state
            // store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

const handleApiError = (error, customMessage) => {
    const errorMessage = error.response?.data?.message || customMessage;
    console.error(errorMessage, error);
    throw new Error(errorMessage);
};

// Get all SEO entries
export const getAllSEO = async () => {
    try {
        const response = await api.get('/seo');
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to fetch SEO entries');
    }
};

// Create a new SEO entry
export const createSEO = async (seoData) => {
    try {
        const response = await api.post('/seo', seoData);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to create SEO entry');
    }
};

// Update an existing SEO entry
export const updateSEO = async (seoId, seoData) => {
    try {
        const response = await api.put(`/seo/${seoId}`, seoData);
        return response.data;
    } catch (error) {
        handleApiError(error, `Failed to update SEO entry with ID ${seoId}`);
    }
};

// Delete an SEO entry
export const deleteSEO = async (seoId) => {
    try {
        const response = await api.delete(`/seo/${seoId}`);
        return response.data;
    } catch (error) {
        handleApiError(error, `Failed to delete SEO entry with ID ${seoId}`);
    }
};

// Optionally, you can export the default API instance if needed
export default api;

