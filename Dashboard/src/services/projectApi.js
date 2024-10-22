import axios from 'axios';
import config from '../config';

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

export default api;