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
            console.log('Attaching token to headers:', token); // Debugging token
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.warn('No token found in localStorage'); // Warn if no token
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

// Update createBlog to handle file uploads
export const createBlog = async (blogData) => {
    try {
        const formData = new FormData();
        // Append all blog data to FormData
        for (const key in blogData) {
            formData.append(key, blogData[key]);
        }
        const response = await api.post('/blog', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the content type for file uploads
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to create the blog');
    }
};

// Update updateBlogById to handle file uploads
export const updateBlogById = async (blogId, blogData) => {
    try {
        const formData = new FormData();
        // Append all blog data to FormData
        for (const key in blogData) {
            formData.append(key, blogData[key]);
        }
        const response = await api.put(`/blog/${blogId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the content type for file uploads
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error, `Failed to update blog with ID ${blogId}`);
    }
};

// Add the deleteBlogById function
export const deleteBlogById = async (blogId) => {
    try {
        const response = await api.delete(`/blog/${blogId}`);
        return response.data;
    } catch (error) {
        handleApiError(error, `Failed to delete blog with ID ${blogId}`);
    }
};

// Optionally, you can export the default API instance if needed
export default api;
