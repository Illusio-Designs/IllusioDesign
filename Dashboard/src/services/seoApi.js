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

// Create a new SEO entry
export const createSeo = async (formData) => {
  try {
    const response = await api.post('/seo', formData); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error creating SEO entry:', error);
    throw error;
  }
};

// Update an existing SEO entry
export const updateSeo = async (updatedSeo) => {
  try {
    const response = await api.put(`/seo/${updatedSeo.id}`, updatedSeo); // Ensure updatedSeo.id is defined
    return response.data; // This should return the updated data
  } catch (error) {
    console.error('Error updating SEO entry:', error);
    throw error;
  }
};

// Update an existing SEO entry by URL
export const updateSeoByUrl = async (url, formData) => {
  try {
    const response = await api.put(`/seo/url/${encodeURIComponent(url)}`, formData); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error updating SEO entry by URL:', error);
    throw error;
  }
};

// Get SEO entry by ID
export const getSeoById = async (id) => {
  try {
    const response = await api.get(`/seo/${id}`); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error fetching SEO entry:', error);
    throw error;
  }
};

// Get all SEO entries
export const getAllSeo = async () => {
  try {
    const response = await api.get('/seo'); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error fetching SEO entries:', error);
    throw error;
  }
};

// Delete an SEO entry
export const deleteSeo = async (id) => {
  try {
    const response = await api.delete(`/seo/${id}`); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error deleting SEO entry:', error);
    throw error;
  }
};

export default api;
