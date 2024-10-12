// dashboard/src/utils/sliderApi.js
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

// Fetch all sliders
export const getAllSliders = async () => {
    try {
        const response = await api.get('/sliders'); // Adjust the endpoint as necessary
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to fetch sliders');
    }
};

// Create a new slider
export const createSlider = async (sliderData) => {
    try {
        const formData = new FormData();
        // Append all slider data to FormData
        for (const key in sliderData) {
            formData.append(key, sliderData[key]);
        }
        const response = await api.post('/sliders/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the content type for file uploads
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
        // Append all slider data to FormData
        for (const key in sliderData) {
            formData.append(key, sliderData[key]);
        }
        const response = await api.put(`/sliders/edit/${sliderId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the content type for file uploads
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

// Optionally, you can export the default API instance if needed
export default api;

