import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.apiUrl, // Ensure this points to your backend API base URL
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token'); // Clear token on unauthorized
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

// Create a new review
export const createReview = async (formData) => {
  try {
    const response = await api.post('/review', formData); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// Get all reviews
export const getAllReviews = async () => {
  try {
    const response = await api.get('/review'); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

// Approve a review
export const approveReview = async (id) => {
  try {
    const response = await api.put(`/review/approve/${id}`); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error approving review:', error);
    throw error;
  }
};

// Reject a review
export const rejectReview = async (id) => {
  try {
    const response = await api.delete(`/review/${id}`); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error rejecting review:', error);
    throw error;
  }
};

export default api;