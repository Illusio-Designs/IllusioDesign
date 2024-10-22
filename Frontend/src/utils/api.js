import axios from 'axios';
import { API_BASE_URL } from '../config'; // Ensure you have a config file with the base URL

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get all public projects
export const getAllPublicProjects = async () => {
    try {
        const response = await api.get('/public/projects'); // Adjust the endpoint as necessary
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error fetching public projects:', error); // Log the error for debugging
        throw error.response?.data?.error || 'Failed to fetch public projects'; // Throw the error message
    }
};

// Function to get a project by title
export const getProjectByTitle = async (title) => {
    try {
        const response = await api.get(`/public/projects/${title}`); // Adjust the endpoint as necessary
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error fetching project by title:', error); // Log the error for debugging
        throw error.response?.data?.error || 'Failed to fetch project by title'; // Throw the error message
    }
};

// Function to get all blogs (if needed)
export const getAllBlogs = async () => {
    try {
        const response = await api.get('/public/blogs');
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error); // Log the error for debugging
        throw error.response?.data?.error || 'Failed to fetch blogs'; // Throw the error message
    }
};

// Function to get a blog by title (if needed)
export const getBlogByTitle = async (title) => {
    try {
        const response = await api.get(`/public/blogs/title/${title}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching blog by title:', error); // Log the error for debugging
        throw error.response?.data?.error || 'Failed to fetch blog by title'; // Throw the error message
    }
};

// Function to get SEO data
export const getSeoData = async (pageId) => {
    try {
        const response = await api.get(`/public/seo/${pageId}`); // Adjust the endpoint as necessary
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error fetching SEO data:', error); // Log the error for debugging
        throw error.response?.data?.error || 'Failed to fetch SEO data'; // Throw the error message
    }
};

// Function to send public page path
export const sendPublicPagePath = async (pathname) => {
    try {
        console.log('Sending pathname:', pathname); 
        const response = await api.post('/public/page-paths', { path: pathname }); // Correct endpoint
        console.log('Sent page path to backend:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending page path to backend:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to fetch existing paths
export const fetchExistingPaths = async () => {
    try {
        const response = await api.get('/public/page-paths'); // Correct endpoint
        return response.data.map(pathObj => pathObj.path); 
    } catch (error) {
        console.error('Error fetching existing paths:', error);
        return [];
    }
};

// Function to fetch pages
export const fetchPages = async () => {
    try {
        const response = await api.get('/page-paths'); // Assuming this endpoint is set up correctly
        return response.data;
    } catch (error) {
        console.error('Error fetching pages:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default api;
