import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add request interceptor to attach the token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('Attaching token to headers:', token); // Debugging token
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log('Request Headers:', config.headers); // Log headers for debugging
        return config;
    },
    (error) => Promise.reject(error)
);

// Fetch all sliders
export const getAllSliders = async () => {
    try {
        const response = await api.get('/sliders');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch sliders:', error);
        throw error; // propagate error
    }
};

// Create a new slider
export const createSlider = async (sliderData) => {
    try {
        const response = await api.post('/sliders', sliderData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create the slider:', error);
        throw error; // propagate error
    }
};

// Update an existing slider
export const updateSliderById = async (sliderId, sliderData) => {
    try {
        const response = await api.put(`/sliders/edit/${sliderId}`, sliderData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to update slider with ID ${sliderId}:`, error);
        throw error; // propagate error
    }
};

// Delete a slider
export const deleteSliderById = async (sliderId) => {
    try {
        await api.delete(`/sliders/delete/${sliderId}`);
    } catch (error) {
        console.error(`Failed to delete slider with ID ${sliderId}:`, error);
        throw error; // propagate error
    }
};
