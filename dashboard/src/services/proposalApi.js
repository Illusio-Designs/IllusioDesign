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
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Create a new proposal
export const createProposal = async (formData) => {
  try {
    const response = await api.post('/proposals', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing proposal's status
export const updateProposalStatus = async (id, status) => {
  try {
    const response = await api.put(`/proposals/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get proposal by ID
export const getProposalById = async (id) => {
  try {
    const response = await api.get(`/proposals/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all proposals
export const getAllProposals = async () => {
  try {
    const response = await api.get('/proposals');
    return response.data;
  } catch (error) {
    console.error('Error fetching proposals:', error.response?.data || error.message);
    throw error;
  }
};

// Delete a proposal
export const deleteProposal = async (id) => {
  try {
    const response = await api.delete(`/proposals/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Transfer an approved proposal to a contract
export const transferProposalToContract = async (id) => {
  try {
    const response = await api.post(`/proposals/${id}/transfer`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Default export for the axios instance, if needed elsewhere
export default api;
