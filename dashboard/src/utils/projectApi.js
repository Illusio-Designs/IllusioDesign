// utils/projectApi.js

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

// Add a request interceptor to include the Authorization header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Or retrieve from your auth state
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.warn('No token found in localStorage'); // Warn if no token
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Function to get all projects
export const getAllProjects = async () => {
    try {
        const response = await api.get('/public/projects'); // Adjust the endpoint as necessary
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error fetching projects:', error); // Log the error for debugging
        throw error.response?.data?.error || 'Failed to fetch projects'; // Throw the error message
    }
};

// Function to create a new project
export const createProject = async (projectData) => {
    try {
        const response = await api.post('/projects', projectData);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error creating project:', error); // Log the error for debugging
        throw error.response?.data?.error || 'Failed to create project'; // Throw the error message
    }
};

// Function to update a project by ID
export const updateProjectById = async (projectId, projectData) => {
    try {
        const response = await api.put(`/projects/${projectId}`, projectData);
        return response.data; // Return the updated project data
    } catch (error) {
        console.error('Error updating project:', error); // Log the error for debugging
        throw error.response?.data?.error || 'Failed to update project'; // Throw the error message
    }
};

// Function to delete a project by ID
export const deleteProjectById = async (projectId) => {
    try {
        const response = await api.delete(`/projects/${projectId}`);
        return response.data; // Return the response data for deleted project
    } catch (error) {
        console.error('Error deleting project:', error); // Log the error for debugging
        throw error.response?.data?.error || 'Failed to delete project'; // Throw the error message
    }
};

export default api;
