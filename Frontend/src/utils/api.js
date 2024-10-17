import axios from 'axios';
import { API_BASE_URL } from '../config'; // Ensure you have a config file with the base URL

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
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

export const getAllBlogs = async () => {
    try {
        const response = await api.get('/public/blogs');
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to fetch blogs');
    }
};

export const getBlogByTitle = async (title) => {
    try {
        const response = await api.get(`/public/blogs/title/${title}`);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to fetch blog by title');
    }
};

export const getProjectByTitle = async (title) => {
    try {
        const response = await api.get(`/public/projects/title/${title}`);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to fetch project by title');
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

export const fetchExistingPaths = async () => {
  try {
    const response = await api.get('/public/page-paths'); // Correct endpoint
    return response.data.map(pathObj => pathObj.path); 
  } catch (error) {
    console.error('Error fetching existing paths:', error);
    return [];
  }
};

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