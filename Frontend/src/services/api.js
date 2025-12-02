const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Backend health check
export const checkBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    if (response.ok) {
      return { connected: true };
    }
    return { connected: false, error: 'Backend not responding' };
  } catch (error) {
    return { connected: false, error: error.message };
  }
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}, isPublic = false) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Only add auth token if not public
  if (!isPublic && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Remove Content-Type for FormData
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Blog APIs
export const blogAPI = {
  getAll: () => apiCall('/private/blogs'),
  getById: (id) => apiCall(`/private/blogs/${id}`),
  create: (formData) => apiCall('/private/blogs', {
    method: 'POST',
    body: formData
  }),
  update: (id, formData) => apiCall(`/private/blogs/${id}`, {
    method: 'PUT',
    body: formData
  }),
  delete: (id) => apiCall(`/private/blogs/${id}`, {
    method: 'DELETE'
  })
};

// Case Study APIs
export const caseStudyAPI = {
  getAll: () => apiCall('/private/case-studies'),
  getById: (id) => apiCall(`/private/case-studies/${id}`),
  create: (formData) => apiCall('/private/case-studies', {
    method: 'POST',
    body: formData
  }),
  update: (id, formData) => apiCall(`/private/case-studies/${id}`, {
    method: 'PUT',
    body: formData
  }),
  delete: (id) => apiCall(`/private/case-studies/${id}`, {
    method: 'DELETE'
  }),
  // Public APIs
  getAllPublic: () => apiCall('/public/case-studies', {}, false),
  getByIdPublic: (id) => apiCall(`/public/case-studies/${id}`, {}, false)
};

// Position APIs
export const positionAPI = {
  getAll: () => apiCall('/private/positions'),
  getById: (id) => apiCall(`/private/positions/${id}`),
  create: (data) => apiCall('/private/positions', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiCall(`/private/positions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiCall(`/private/positions/${id}`, {
    method: 'DELETE'
  })
};

// Application APIs
export const applicationAPI = {
  getAll: () => apiCall('/private/applications'),
  getById: (id) => apiCall(`/private/applications/${id}`),
  update: (id, data) => apiCall(`/private/applications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiCall(`/private/applications/${id}`, {
    method: 'DELETE'
  })
};

// Contact APIs
export const contactAPI = {
  getAll: () => apiCall('/private/contact-messages'),
  getById: (id) => apiCall(`/private/contact-messages/${id}`),
  update: (id, data) => apiCall(`/private/contact-messages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiCall(`/private/contact-messages/${id}`, {
    method: 'DELETE'
  })
};

// Team APIs
export const teamAPI = {
  getAll: () => apiCall('/private/team'),
  getById: (id) => apiCall(`/private/team/${id}`),
  create: (formData) => apiCall('/private/team', {
    method: 'POST',
    body: formData
  }),
  update: (id, formData) => apiCall(`/private/team/${id}`, {
    method: 'PUT',
    body: formData
  }),
  delete: (id) => apiCall(`/private/team/${id}`, {
    method: 'DELETE'
  })
};

// SEO APIs
export const seoAPI = {
  getAll: () => apiCall('/private/seo'),
  getByPage: (page) => apiCall(`/private/seo/page/${page}`),
  create: (formData) => apiCall('/private/seo', {
    method: 'POST',
    body: formData
  }),
  update: (page, formData) => apiCall(`/private/seo/page/${page}`, {
    method: 'PUT',
    body: formData
  }),
  delete: (id) => apiCall(`/private/seo/${id}`, {
    method: 'DELETE'
  })
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => apiCall('/private/dashboard/stats'),
  getProfile: () => apiCall('/private/dashboard/profile'),
  updateProfile: async (data) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE_URL}/private/dashboard/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update profile');
      }
      return { success: true, user: result.user };
    } catch (error) {
      throw error;
    }
  }
};

// Auth APIs (public - no token required)
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/public/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Login API Error:', error);
      throw error;
    }
  },
  register: async (username, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/public/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Register API Error:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/public/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Logout API Error:', error);
      throw error;
    }
  }
};

// User APIs (admin only)
export const userAPI = {
  getAll: () => apiCall('/private/admin/users'),
  getById: (id) => apiCall(`/private/admin/users/${id}`),
  create: (data) => apiCall('/private/admin/users', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiCall(`/private/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiCall(`/private/admin/users/${id}`, {
    method: 'DELETE'
  })
};

// Privacy Policy APIs
export const privacyPolicyAPI = {
  getAll: () => apiCall('/private/privacy-policy'),
  getById: (id) => apiCall(`/private/privacy-policy/${id}`),
  create: (data) => apiCall('/private/privacy-policy', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiCall(`/private/privacy-policy/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiCall(`/private/privacy-policy/${id}`, {
    method: 'DELETE'
  })
};

// Terms of Service APIs
export const termsOfServiceAPI = {
  getAll: () => apiCall('/private/terms-of-service'),
  getById: (id) => apiCall(`/private/terms-of-service/${id}`),
  create: (data) => apiCall('/private/terms-of-service', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiCall(`/private/terms-of-service/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiCall(`/private/terms-of-service/${id}`, {
    method: 'DELETE'
  })
};

export default API_BASE_URL;

