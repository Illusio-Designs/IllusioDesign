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

// Create a new appointment
export const createAppointment = async (formData) => {
  try {
    const response = await api.post('/appointment', formData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Get all appointments
export const getAllAppointments = async () => {
  try {
    const response = await api.get('/appointment');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Get appointment by ID
export const getAppointmentById = async (id) => {
  try {
    const response = await api.get(`/appointment/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    throw error;
  }
};

// Update appointment status
export const updateAppointmentStatus = async (id, formData) => {
  try {
    const response = await api.put(`/appointment/${id}/status`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};

// Delete an appointment
export const deleteAppointment = async (id) => {
  try {
    const response = await api.delete(`/appointment/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

export default api;
