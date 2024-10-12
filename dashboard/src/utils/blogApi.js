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

// Export functions directly
export const getAllBlogs = async () => {
    try {
        const response = await api.get('/public/blogs');
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to fetch blogs');
    }
};

export const createBlog = async (blogData) => {
    try {
        const response = await api.post('/blog', blogData);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to create the blog');
    }
};

export const updateBlogById = async (blogId, blogData) => {
    try {
        const response = await api.put(`/blog/${blogId}`, blogData);
        return response.data;
    } catch (error) {
        handleApiError(error, `Failed to update blog with ID ${blogId}`);
    }
};

// Optionally, you can export the default API instance if needed
export default api;
