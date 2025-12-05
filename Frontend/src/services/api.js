import interceptedFetch from './fetchInterceptor';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.illusiodesigns.agency/api';

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
    const response = await interceptedFetch(`${API_BASE_URL.replace('/api', '')}/health`, {
      method: 'GET'
    }, { isPublic: true, skipAuth: true });
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
  try {
    const response = await interceptedFetch(`${API_BASE_URL}${endpoint}`, {
      ...options
    }, { isPublic });

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
  }),
  // Public APIs
  getAllPublic: () => apiCall('/public/blogs', {}, true),
  getBySlugPublic: (slug) => apiCall(`/public/blogs/slug/${slug}`, {}, true),
  getByIdPublic: (id) => apiCall(`/public/blogs/${id}`, {}, true)
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
  getAllPublic: (category) => {
    const queryParams = category ? `?category=${encodeURIComponent(category)}` : '';
    return apiCall(`/public/case-studies${queryParams}`, {}, false);
  },
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
  }),
  // Public APIs
  getAllPublic: () => apiCall('/public/positions', {}, true),
  getByIdPublic: (id) => apiCall(`/public/positions/${id}`, {}, true)
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
  }),
  // Public API - Create application with file upload
  create: async (formData) => {
    try {
      const response = await interceptedFetch(`${API_BASE_URL}/public/applications`, {
        method: 'POST',
        body: formData
      }, { isPublic: true, skipAuth: true });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Application API Error:', error);
      throw error;
    }
  }
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
  }),
  // Public API - Create contact message
  create: (data) => apiCall('/public/contact', {
    method: 'POST',
    body: JSON.stringify(data)
  }, true)
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
  }),
  // Public API
  getAllPublic: () => apiCall('/public/team', {}, true)
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
  }),
  // Public API
  getByPagePublic: (page) => apiCall(`/public/seo/${page}`, {}, true)
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => apiCall('/private/dashboard/stats'),
  getProfile: () => apiCall('/private/dashboard/profile'),
  updateProfile: async (data) => {
    try {
      const response = await interceptedFetch(`${API_BASE_URL}/private/dashboard/profile`, {
        method: 'PUT',
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

// Auth APIs (private endpoints - login/register skip auth since user doesn't have token yet)
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await interceptedFetch(`${API_BASE_URL}/private/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      }, { skipAuth: true });

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
      const response = await interceptedFetch(`${API_BASE_URL}/private/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ username, email, password })
      }, { skipAuth: true });

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
      // Logout doesn't require token - use skipAuth to avoid 401 errors if token is invalid
      const response = await interceptedFetch(`${API_BASE_URL}/private/auth/logout`, {
        method: 'POST'
      }, { skipAuth: true });

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
  }),
  // Public API
  getPublic: () => apiCall('/public/privacy-policy', {}, true)
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
  }),
  // Public API
  getPublic: () => apiCall('/public/terms-of-service', {}, true)
};

export default API_BASE_URL;

