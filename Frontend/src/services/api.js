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
    }, { isPublic: true, skipAuth: true, skipInterceptors: true });
    if (response.ok) {
      return { connected: true };
    }
    return { connected: false, error: 'Backend not responding' };
  } catch (error) {
    return { connected: false, error: error.message };
  }
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}, isPublic = false, skipInterceptors = false) => {
  try {
    // Use cache: 'no-store' to prevent 304 responses (this is a fetch option, not a header)
    const fetchOptions = {
      ...options,
      cache: 'no-store',
      headers: {
        ...options.headers
      }
    };

    let response = await interceptedFetch(`${API_BASE_URL}${endpoint}`, fetchOptions, { isPublic, skipInterceptors });

    // Handle 304 Not Modified - response has no body, retry with cache busting query param
    if (response.status === 304) {
      // Retry with timestamp query parameter to bust cache
      const separator = endpoint.includes('?') ? '&' : '?';
      const cacheBustUrl = `${API_BASE_URL}${endpoint}${separator}_t=${Date.now()}`;
      response = await interceptedFetch(cacheBustUrl, fetchOptions, { isPublic, skipInterceptors });
    }

    // Parse response body
    let data;
    try {
      // Check if response has content
      const text = await response.text();
      if (text && text.trim().length > 0) {
        data = JSON.parse(text);
      } else if (response.ok) {
        // Empty but successful response - return empty data structure
        console.warn('Empty response body for:', endpoint);
        data = { data: [], success: true };
      } else {
        throw new Error(`Empty response body with status ${response.status}`);
      }
    } catch (parseError) {
      if (parseError instanceof SyntaxError) {
        console.error('JSON parse error for:', endpoint, parseError.message);
        throw new Error('Invalid JSON response from server');
      }
      throw parseError;
    }

    if (!response.ok) {
      throw new Error(data?.error || `HTTP error! status: ${response.status}`);
    }

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Success] ${endpoint}:`, {
        status: response.status,
        dataStructure: typeof data,
        hasData: !!data,
        dataKeys: data && typeof data === 'object' ? Object.keys(data) : 'N/A',
        dataLength: Array.isArray(data) ? data.length : (data?.data && Array.isArray(data.data) ? data.data.length : 'N/A'),
        fullData: data // Log full data for debugging
      });
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
  // getAllPublic - use interceptors (page-aware: intercepted on blog/home pages, skipped on blog-detail)
  getAllPublic: () => apiCall('/public/blogs', {}, true, false),
  // getBySlugPublic - use interceptors (main API for blog-detail page)
  getBySlugPublic: (slug) => apiCall(`/public/blogs/slug/${slug}`, {}, true, false),
  // getByIdPublic - use interceptors (main API for blog-detail page)
  getByIdPublic: (id) => apiCall(`/public/blogs/${id}`, {}, true, false)
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
  // getAllPublic - use interceptors (page-aware: intercepted on case-study/home pages, skipped on case-study-detail)
  getAllPublic: (category) => {
    const queryParams = category ? `?category=${encodeURIComponent(category)}` : '';
    return apiCall(`/public/case-studies${queryParams}`, {}, false, false);
  },
  // getByIdPublic - use interceptors (main API for case-study-detail page)
  getByIdPublic: (id) => apiCall(`/public/case-studies/${id}`, {}, false, false)
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
  // getAllPublic - use interceptors (page-aware: intercepted on career page)
  getAllPublic: () => apiCall('/public/positions', {}, true, false),
  // getBySlugPublic - use interceptors (main API for position-apply page)
  getBySlugPublic: (slug) => apiCall(`/public/positions/slug/${slug}`, {}, true, false),
  // Legacy fallback by id (kept for backward compatibility)
  getByIdPublic: (id) => apiCall(`/public/positions/${id}`, {}, true, false)
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
      }, { isPublic: true, skipAuth: true, skipInterceptors: true });

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
  // Public API - Create contact message - skip interceptors for simple public calls
  create: (data) => apiCall('/public/contact', {
    method: 'POST',
    body: JSON.stringify(data)
  }, true, true)
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
  // Public API - use interceptors (page-aware: intercepted on about/home pages)
  getAllPublic: () => apiCall('/public/team', {}, true, false)
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
  // Public API - skip interceptors for simple public calls
  getByPagePublic: (page) => apiCall(`/public/seo/${page}`, {}, true, true)
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiCall(`/private/privacy-policy/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  delete: (id) => apiCall(`/private/privacy-policy/${id}`, {
    method: 'DELETE'
  }),
  // Public API - use interceptors (page-aware: intercepted on privacy page)
  getPublic: () => apiCall('/public/privacy-policy', {}, true, false)
};

// Terms of Service APIs
export const termsOfServiceAPI = {
  getAll: () => apiCall('/private/terms-of-service'),
  getById: (id) => apiCall(`/private/terms-of-service/${id}`),
  create: (data) => apiCall('/private/terms-of-service', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiCall(`/private/terms-of-service/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  delete: (id) => apiCall(`/private/terms-of-service/${id}`, {
    method: 'DELETE'
  }),
  // Public API - use interceptors (page-aware: intercepted on terms page)
  getPublic: () => apiCall('/public/terms-of-service', {}, true, false)
};

// Review APIs
export const reviewAPI = {
  // Private APIs (admin)
  getAll: () => apiCall('/private/reviews'),
  getById: (id) => apiCall(`/private/reviews/${id}`),
  approve: (id) => apiCall(`/private/reviews/${id}/approve`, {
    method: 'PUT'
  }),
  decline: (id) => apiCall(`/private/reviews/${id}/decline`, {
    method: 'PUT'
  }),
  delete: (id) => apiCall(`/private/reviews/${id}`, {
    method: 'DELETE'
  }),
  // Public APIs
  submit: (data) => apiCall('/public/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }, true, true), // Public endpoint, skip interceptors
  getAllPublic: () => apiCall('/public/reviews', {}, true, false) // Use interceptors for caching
};

export default API_BASE_URL;

