import axios from 'axios';
import { API_BASE_URL } from '../config';

// Create an Axios instance with default settings
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Function to check if the token is expired
const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000; // Check if the current time is past the expiration
};

// Add a request interceptor to attach the token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log('Retrieving token from localStorage:', token);
        if (token && !isTokenExpired(token)) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.warn('Token is expired or not found in localStorage');
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Function to upload an image
export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await api.post('/projects/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.url; // Adjust according to your backend response
    } catch (error) {
        console.error('Error uploading image:', error.response?.data || error.message);
        throw error.response?.data?.error || 'Failed to upload image';
    }
};

// Function to get all projects
export const getAllProjects = async () => {
    try {
        const response = await api.get('/public/projects'); // Adjust the endpoint as necessary
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error.response?.data?.error || 'Failed to fetch projects';
    }
};

// Function to create a new project
export const createProject = async (projectData) => {
    try {
        const response = await api.post('/projects', projectData);
        return response.data; // Return the newly created project data
    } catch (error) {
        console.error('Error creating project:', error.response?.data || error.message);
        throw error.response?.data?.error || 'Failed to create project';
    }
};

// Function to update a project by ID
export const updateProjectById = async (projectId, projectData) => {
    try {
        const response = await api.put(`/projects/${projectId}`, projectData);
        return response.data; // Return the updated project data
    } catch (error) {
        console.error('Error updating project:', error);
        throw error.response?.data?.error || 'Failed to update project';
    }
};

// Function to delete a project by ID
export const deleteProjectById = async (projectId) => {
    try {
        const response = await api.delete(`/projects/${projectId}`);
        return response.data; // Return the response data for the deleted project
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error.response?.data?.error || 'Failed to delete project';
    }
};

export default api; // Export the Axios instance for use in other modules
