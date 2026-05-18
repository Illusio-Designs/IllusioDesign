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

/* Blog — public read + private admin CRUD (create/update send FormData) */
export const blogAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/blogs')),
  getBySlugPublic: async (slug) =>
    extractItem(await apiCall(`/public/blogs/slug/${encodeURIComponent(slug)}`)),
  getByIdPublic: async (id) =>
    extractItem(await apiCall(`/public/blogs/${id}`)),
  getAll: async () => extractList(await apiCall('/private/blogs')),
  getById: async (id) => extractItem(await apiCall(`/private/blogs/${id}`)),
  create: (formData) => apiCall('/private/blogs', { method: 'POST', body: formData }),
  update: (id, formData) => apiCall(`/private/blogs/${id}`, { method: 'PUT', body: formData }),
  remove: (id) => apiCall(`/private/blogs/${id}`, { method: 'DELETE' }),
};

/* Case studies — public read + private admin CRUD (create/update send FormData) */
export const caseStudyAPI = {
  getAllPublic: async (category) => {
    const qs = category ? `?category=${encodeURIComponent(category)}` : '';
    return extractList(await apiCall(`/public/case-studies${qs}`));
  },
  getByIdPublic: async (id) =>
    extractItem(await apiCall(`/public/case-studies/${id}`)),
  getAll: async () => extractList(await apiCall('/private/case-studies')),
  getById: async (id) => extractItem(await apiCall(`/private/case-studies/${id}`)),
  create: (formData) => apiCall('/private/case-studies', { method: 'POST', body: formData }),
  update: (id, formData) => apiCall(`/private/case-studies/${id}`, { method: 'PUT', body: formData }),
  remove: (id) => apiCall(`/private/case-studies/${id}`, { method: 'DELETE' }),
};

/* Positions / Careers — public read + private admin CRUD (JSON) */
export const positionAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/positions')),
  getBySlugPublic: async (slug) =>
    extractItem(await apiCall(`/public/positions/slug/${encodeURIComponent(slug)}`)),
  getByIdPublic: async (id) =>
    extractItem(await apiCall(`/public/positions/${id}`)),
  getAll: async () => extractList(await apiCall('/private/positions')),
  getById: async (id) => extractItem(await apiCall(`/private/positions/${id}`)),
  create: (data) => apiCall('/private/positions', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/private/positions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => apiCall(`/private/positions/${id}`, { method: 'DELETE' }),
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

/* Team — public read + private admin CRUD (create/update send FormData) */
export const teamAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/team')),
  getAll: async () => extractList(await apiCall('/private/team')),
  getById: async (id) => extractItem(await apiCall(`/private/team/${id}`)),
  create: (formData) => apiCall('/private/team', { method: 'POST', body: formData }),
  update: (id, formData) => apiCall(`/private/team/${id}`, { method: 'PUT', body: formData }),
  remove: (id) => apiCall(`/private/team/${id}`, { method: 'DELETE' }),
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

/* SEO — public read + private admin CRUD (create/update send FormData) */
export const seoAPI = {
  getByPagePublic: async (page) =>
    extractItem(await apiCall(`/public/seo/${page}`)),
  getAll: async () => extractList(await apiCall('/private/seo')),
  getByPage: async (page) => extractItem(await apiCall(`/private/seo/page/${page}`)),
  create: (formData) => apiCall('/private/seo', { method: 'POST', body: formData }),
  update: (page, formData) =>
    apiCall(`/private/seo/page/${page}`, { method: 'PUT', body: formData }),
  remove: (id) => apiCall(`/private/seo/${id}`, { method: 'DELETE' }),
};

/* Privacy / Terms — public read + private admin CRUD */
export const privacyPolicyAPI = {
  getPublic: async () => extractItem(await apiCall('/public/privacy-policy')),
  getAll: async () => extractList(await apiCall('/private/privacy-policy')),
  create: (data) =>
    apiCall('/private/privacy-policy', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiCall(`/private/privacy-policy/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  remove: (id) => apiCall(`/private/privacy-policy/${id}`, { method: 'DELETE' }),
};

export const termsOfServiceAPI = {
  getPublic: async () => extractItem(await apiCall('/public/terms-of-service')),
  getAll: async () => extractList(await apiCall('/private/terms-of-service')),
  create: (data) =>
    apiCall('/private/terms-of-service', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiCall(`/private/terms-of-service/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  remove: (id) => apiCall(`/private/terms-of-service/${id}`, { method: 'DELETE' }),
};

/* Policy — unified privacy + terms (one row per type: 'privacy' | 'terms') */
export const policyAPI = {
  getPublic: async (type) => extractItem(await apiCall(`/public/policy/${type}`)),
  getAll: async () => extractList(await apiCall('/private/policy')),
  getByType: async (type) => extractItem(await apiCall(`/private/policy/${type}`)),
  upsert: (type, data) =>
    apiCall(`/private/policy/${type}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  remove: (type) => apiCall(`/private/policy/${type}`, { method: 'DELETE' }),
};

/* Content — reusable content blocks keyed by a unique slug */
export const contentAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/content')),
  getByKeyPublic: async (key) =>
    extractItem(await apiCall(`/public/content/${encodeURIComponent(key)}`)),
  getAll: async () => extractList(await apiCall('/private/content')),
  getById: async (id) => extractItem(await apiCall(`/private/content/${id}`)),
  create: (data) =>
    apiCall('/private/content', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) =>
    apiCall(`/private/content/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => apiCall(`/private/content/${id}`, { method: 'DELETE' }),
};

/* Milestones — public company roadmap read + private admin CRUD */
export const milestoneAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/milestones')),
  getAll: async () => extractList(await apiCall('/private/milestones')),
  getById: async (id) => extractItem(await apiCall(`/private/milestones/${id}`)),
  create: (data) =>
    apiCall('/private/milestones', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) =>
    apiCall(`/private/milestones/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => apiCall(`/private/milestones/${id}`, { method: 'DELETE' }),
};

/* Platform settings — key/value site configuration */
export const settingsAPI = {
  getPublic: async () => (await extractItem(await apiCall('/public/settings'))) || {},
  getAll: async () => extractList(await apiCall('/private/settings')),
  update: (values) =>
    apiCall('/private/settings', {
      method: 'PUT',
      body: JSON.stringify({ settings: values }),
    }),
  updateOne: (key, data) =>
    apiCall(`/private/settings/${encodeURIComponent(key)}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  remove: (key) =>
    apiCall(`/private/settings/${encodeURIComponent(key)}`, { method: 'DELETE' }),
};

/* Admin users — private admin endpoints */
export const userAPI = {
  getAll: async () => extractList(await apiCall('/private/admin/users')),
  create: (data) =>
    apiCall('/private/admin/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiCall(`/private/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  remove: (id) => apiCall(`/private/admin/users/${id}`, { method: 'DELETE' }),
};

export default API_BASE_URL;
