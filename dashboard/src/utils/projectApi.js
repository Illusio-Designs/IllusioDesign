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

// Function to get all projects
export const getAllProjects = async () => {
    try {
        const response = await api.get('/public/projects'); // Adjust the endpoint as necessary
        return response.data; // Return the response data
    } catch (error) {
        throw error.response?.data?.error || 'Failed to fetch projects'; // Throw the error message
    }
};

// Function to create a new project
export const createProject = async (projectData) => {
    try {
        const response = await api.post('/projects', projectData);
        return response.data; // Return the response data
    } catch (error) {
        throw error.response?.data?.error || 'Failed to create project'; // Throw the error message
    }
};

// Function to update a project by ID
export const updateProjectById = async (projectId, projectData) => {
    try {
        const response = await api.put(`/projects/${projectId}`, projectData);
        return response.data; // Return the updated project data
    } catch (error) {
        throw error.response?.data?.error || 'Failed to update project'; // Throw the error message
    }
};

// Function to delete a project by ID
export const deleteProjectById = async (projectId) => {
    try {
        const response = await api.delete(`/projects/${projectId}`);
        return response.data; // Return the response data for deleted project
    } catch (error) {
        throw error.response?.data?.error || 'Failed to delete project'; // Throw the error message
    }
};

export default api;
