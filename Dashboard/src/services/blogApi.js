import axios from 'axios';
import config from '../config';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: config.apiUrl,
});

// Request Interceptor
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

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized responses
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    // Log other errors for better debugging
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Create a new blog
export const createBlog = async (formData) => {
  try {
    const response = await api.post('/blog', formData);
    return response.data;
  } catch (error) {
    throw error; // Re-throw for handling in the component
  }
};

// Update an existing blog
export const updateBlog = async (id, formData) => {
  try {
    const response = await api.put(`/blog/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error; // Re-throw for handling in the component
  }
};

// Get blog by ID
export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blog/${id}`);
    return response.data;
  } catch (error) {
    throw error; // Re-throw for handling in the component
  }
};

// Get all blogs
export const getAllBlogs = async () => {
  try {
    const response = await api.get('/blog');
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error.response?.data || error.message);
    throw error; // Re-throw for handling in the component
  }
};

// Delete a blog
export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/blog/${id}`);
    return response.data;
  } catch (error) {
    throw error; // Re-throw for handling in the component
  }
};

// Default export for the axios instance, if needed elsewhere
export default api;
