const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.illusiodesigns.agency/api';
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';

const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('auth_token');
  } catch {
    return null;
  }
};

const apiCall = async (endpoint, options = {}) => {
  const { skipAuth, ...rest } = options;
  const token = skipAuth ? null : getAuthToken();
  const fetchOptions = {
    ...rest,
    cache: 'no-store',
    headers: {
      ...(rest.body instanceof FormData
        ? {}
        : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...rest.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    const err = new Error(data?.error || `HTTP ${response.status}`);
    err.status = response.status;
    throw err;
  }
  return data;
};

export const extractList = (response) => {
  if (Array.isArray(response)) return response;
  if (response && Array.isArray(response.data)) return response.data;
  return [];
};

export const extractItem = (response) => {
  if (!response) return null;
  if (response.data && typeof response.data === 'object') return response.data;
  return response;
};

// Strip stray JSON artifacts ([ ] { } " ') from the ends of a value.
const cleanToken = (v) =>
  String(v)
    .replace(/^[\s"'[\]{}]+/, '')
    .replace(/[\s"'[\]{}]+$/, '')
    .trim();

// Clean a plain text field — strips wrapping quotes/brackets but keeps inner text.
export const cleanText = (v) => {
  if (v == null) return '';
  return String(v)
    .replace(/^[\s"'[\]{}]+/, '')
    .replace(/[\s"'[\]{}]+$/, '')
    .trim();
};

// Normalise any API "list" field into a clean string array.
// Handles real arrays, JSON-encoded strings ('["a","b"]'), and comma lists.
export const toArrayField = (value) => {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value.flatMap(toArrayField);
  }
  if (typeof value !== 'string') {
    const t = cleanToken(value);
    return t ? [t] : [];
  }
  const s = value.trim();
  if (!s) return [];
  if ((s.startsWith('[') && s.endsWith(']')) || (s.startsWith('{') && s.endsWith('}'))) {
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return parsed.map(cleanToken).filter(Boolean);
      if (parsed && typeof parsed === 'object') {
        return Object.values(parsed).map(cleanToken).filter(Boolean);
      }
    } catch {
      // fall through to comma split
    }
  }
  return s.split(',').map(cleanToken).filter(Boolean);
};

export const resolveImage = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads/')) return `${IMAGE_BASE_URL}${path}`;
  if (!path.startsWith('/')) return `${IMAGE_BASE_URL}/${path}`;
  return path;
};

/* Blog */
export const blogAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/blogs')),
  getBySlugPublic: async (slug) =>
    extractItem(await apiCall(`/public/blogs/slug/${encodeURIComponent(slug)}`)),
  getByIdPublic: async (id) =>
    extractItem(await apiCall(`/public/blogs/${id}`)),
};

/* Case studies */
export const caseStudyAPI = {
  getAllPublic: async (category) => {
    const qs = category ? `?category=${encodeURIComponent(category)}` : '';
    return extractList(await apiCall(`/public/case-studies${qs}`));
  },
  getByIdPublic: async (id) =>
    extractItem(await apiCall(`/public/case-studies/${id}`)),
};

/* Positions / Careers */
export const positionAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/positions')),
  getBySlugPublic: async (slug) =>
    extractItem(await apiCall(`/public/positions/slug/${encodeURIComponent(slug)}`)),
  getByIdPublic: async (id) =>
    extractItem(await apiCall(`/public/positions/${id}`)),
};

/* Applications — public create (FormData) + private admin endpoints */
export const applicationAPI = {
  create: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/public/applications`, {
      method: 'POST',
      body: formData,
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    if (!response.ok) {
      throw new Error(data?.error || `HTTP ${response.status}`);
    }
    return data;
  },
  getAll: async () => extractList(await apiCall('/private/applications')),
  update: (id, data) =>
    apiCall(`/private/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  remove: (id) => apiCall(`/private/applications/${id}`, { method: 'DELETE' }),
};

/* Contact — public create + private admin endpoints */
export const contactAPI = {
  create: (data) =>
    apiCall('/public/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAll: async () => extractList(await apiCall('/private/contact-messages')),
  update: (id, data) =>
    apiCall(`/private/contact-messages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  remove: (id) => apiCall(`/private/contact-messages/${id}`, { method: 'DELETE' }),
};

/* Team */
export const teamAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/team')),
};

/* Reviews */
export const reviewAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/reviews')),
  submit: (data) =>
    apiCall('/public/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

/* Auth */
export const authAPI = {
  login: (email, password) =>
    apiCall('/private/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    }),
  register: (username, email, password) =>
    apiCall('/private/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      skipAuth: true,
    }),
  logout: () => apiCall('/private/auth/logout', { method: 'POST' }),
};

export const getStoredToken = getAuthToken;

export const isAuthenticated = () => Boolean(getAuthToken());

/* SEO */
export const seoAPI = {
  getByPagePublic: async (page) =>
    extractItem(await apiCall(`/public/seo/${page}`)),
};

/* Privacy / Terms */
export const privacyPolicyAPI = {
  getPublic: async () => extractItem(await apiCall('/public/privacy-policy')),
};

export const termsOfServiceAPI = {
  getPublic: async () => extractItem(await apiCall('/public/terms-of-service')),
};

export default API_BASE_URL;
