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

// api.js
export const registerUser = async (formData) => {
  try {
    // Log the FormData contents for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]); // Debug log
    }

    const response = await api.post('/users/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct content type
      },
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error.response?.data || error.message);
    throw error;
  }
};

export const updateUser = async (id, formData) => {
  try {
    const response = await api.put(`/users/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};


export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post('/users/login', { email, password });
    return response; // Ensure this returns the response object directly
  } catch (error) {
    console.error('Login API Error:', error);
    throw error; // Propagate error
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const listUsers = () => api.get('/users/list');
export const deleteUser = (id) => api.delete(`/users/delete/${id}`);

export default api;