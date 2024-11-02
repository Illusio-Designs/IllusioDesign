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

// Function to get all blogs
export const getAllPublicBlogs = async () => {
    try {
        const response = await api.get('/public/blogs');
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error); // Log the error for debugging
        throw error.response?.data?.error || 'Failed to fetch blogs'; // Throw the error message
    }
};

// Function to get a blog by title
export const getPublicBlogByTitle = async (title) => {
    try {
        const response = await api.get(`/public/blogs/${title}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching blog by title:', error); // Log the error for debugging
        throw error.response?.data?.error || 'Failed to fetch blog by title'; // Throw the error message
    }
};

// Function to get all public SEO entries
export const getAllPublicSeo = async () => {
    try {
        console.log('Fetching all public SEO entries...');
        const response = await api.get('/public/seo'); // Ensure the endpoint is correct
        console.log('Received public SEO entries:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error fetching public SEO entries:', error);
        throw error.response?.data?.error || 'Failed to fetch public SEO entries';
    }
};

// Fetch a single SEO entry by page URL
export const getPublicSeoByUrl = async (pageId) => {
    try {
        console.log(`Fetching SEO entry for page URL: ${pageId}`);
        const response = await api.get(`/public/seo${pageId}`); // Ensure the URL is correct
        console.log('Received SEO entry:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching SEO entry by page URL:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

// Initialize default SEO data
export const initializeDefaultSeo = async () => {
    try {
        console.log('Initializing default SEO data...');
        const response = await api.post('/public/seo/initialize-default'); // Call the initialization endpoint
        console.log('Default SEO data initialized:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error initializing default SEO data:', error);
        throw error.response?.data?.error || 'Failed to initialize default SEO data';
    }
};