// dashboard/src/utils/sliderApi.js
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Create an Axios instance with the base URL and default headers
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable sending cookies with every request
});

// Add a request interceptor to include the Authorization header with the token from localStorage
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

// Add a response interceptor for handling global errors, e.g., unauthorized access
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized access - redirecting to login.');
            // Optionally, add a logout function or redirection here
        }
        return Promise.reject(error);
    }
);

// Centralized function to handle and log API errors with custom messages
const handleApiError = (error, customMessage) => {
    const errorMessage = error.response?.data?.message || customMessage || 'An unknown error occurred';
    console.error(errorMessage, error.response?.data || error); // Log the full error response for debugging
    throw new Error(errorMessage); // Throw error for higher-level handling
};

// Fetch all sliders
export const getAllSliders = async () => {
    try {
        const response = await api.get('/sliders');
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to fetch sliders');
    }
};

// Create a new slider with form data
export const createSlider = async (sliderData) => {
    try {
        const formData = new FormData();
        // Append all properties of sliderData to formData
        for (const key in sliderData) {
            formData.append(key, sliderData[key]);
        }
        const response = await api.post('/sliders', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to create the slider');
    }
};

// Update an existing slider by ID
export const updateSliderById = async (sliderId, sliderData) => {
    try {
        const formData = new FormData();
        for (const key in sliderData) {
            formData.append(key, sliderData[key]);
        }
        const response = await api.put(`/sliders/edit/${sliderId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error, `Failed to update slider with ID ${sliderId}`);
    }
};

// Delete a slider by ID
export const deleteSliderById = async (sliderId) => {
    try {
        const response = await api.delete(`/sliders/delete/${sliderId}`);
        return response.data;
    } catch (error) {
        handleApiError(error, `Failed to delete slider with ID ${sliderId}`);
    }
};

// Optionally export the Axios instance for custom API calls
export default api;
