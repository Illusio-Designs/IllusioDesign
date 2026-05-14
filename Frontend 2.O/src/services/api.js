const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.illusiodesigns.agency/api';
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';

const apiCall = async (endpoint, options = {}) => {
  const fetchOptions = {
    ...options,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(data?.error || `HTTP ${response.status}`);
  }
  return data;
};

const extractList = (response) => {
  if (Array.isArray(response)) return response;
  if (response && Array.isArray(response.data)) return response.data;
  return [];
};

export const resolveImage = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads/')) return `${IMAGE_BASE_URL}${path}`;
  if (!path.startsWith('/')) return `${IMAGE_BASE_URL}/${path}`;
  return path;
};

export const caseStudyAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/case-studies')),
};

export const blogAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/blogs')),
};

export const reviewAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/reviews')),
};

export const teamAPI = {
  getAllPublic: async () => extractList(await apiCall('/public/team')),
};

export const contactAPI = {
  create: (data) =>
    apiCall('/public/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default API_BASE_URL;
