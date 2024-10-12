import axios from 'axios';
import { API_BASE_URL } from '../config'; // Ensure you have a config file with the base URL

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: API_BASE_URL, // e.g., 'http://localhost:5000/api'
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

export default api;