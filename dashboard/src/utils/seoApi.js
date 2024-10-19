import axios from 'axios';
import { API_BASE_URL } from '../config';

// Create an Axios instance for SEO with the base URL
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add request interceptor
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

// Add response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized access');
        }
        return Promise.reject(error);
    }
);

// Function to create a new SEO entry
export const createSEO = async (seoData) => {
    try {
        const response = await api.post('/seo/create', seoData);
        return response.data;
    } catch (error) {
        console.error('Failed to create SEO entry:', error);
        throw error;
    }
};

// Function to update an existing SEO entry
export const updateSEO = async (seoId, seoData) => {
    try {
        const response = await api.put(`/seo/${seoId}`, seoData);
        return response.data;
    } catch (error) {
        console.error(`Failed to update SEO entry with ID ${seoId}:`, error);
        throw error;
    }
};
