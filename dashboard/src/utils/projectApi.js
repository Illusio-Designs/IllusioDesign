import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add Authorization header to each request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Or wherever you're storing it
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const createProject = async (projectData) => {
    const formData = new FormData();
    for (const key in projectData) {
        formData.append(key, projectData[key]);
    }
    try {
        const response = await api.post('/projects', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Failed to create project';
    }
};

export const getAllProjects = async () => {
    try {
        const response = await api.get('/projects');
        console.log('Projects fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error.response?.data?.error || 'Failed to fetch projects';
    }
};


export const updateProjectById = async (projectId, projectData) => {
    const formData = new FormData();
    for (const key in projectData) {
        formData.append(key, projectData[key]);
    }
    try {
        const response = await api.put(`/projects/${projectId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Failed to update project';
    }
};

export const deleteProjectById = async (projectId) => {
    try {
        await api.delete(`/projects/${projectId}`);
        return { message: 'Project deleted successfully' };
    } catch (error) {
        throw error.response?.data?.error || 'Failed to delete project';
    }
};
