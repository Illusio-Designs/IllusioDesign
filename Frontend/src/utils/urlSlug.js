// Utility functions for converting service names to URL slugs and vice versa

// Map service names to their URL slugs
const serviceSlugMap = {
  'branding': 'branding-design',
  'web-app': 'web-app-development',
  'marketing': 'digital-marketing',
  'b2b': 'b2b-custom-solutions'
};

// Reverse map for converting slugs back to service names
const slugToServiceMap = Object.fromEntries(
  Object.entries(serviceSlugMap).map(([key, value]) => [value, key])
);

/**
 * Convert service name to URL-friendly slug
 * @param {string} serviceName - The service name (e.g., 'web-app', 'branding')
 * @returns {string} - URL slug (e.g., 'web-app-development', 'branding-design')
 */
export function serviceNameToSlug(serviceName) {
  return serviceSlugMap[serviceName] || serviceName.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Convert URL slug back to service name
 * @param {string} slug - The URL slug (e.g., 'web-app-development')
 * @returns {string} - Service name (e.g., 'web-app')
 */
export function slugToServiceName(slug) {
  return slugToServiceMap[slug] || slug.replace(/-/g, ' ');
}

/**
 * Convert any string to URL-friendly slug (replaces spaces with hyphens)
 * @param {string} str - String to convert
 * @returns {string} - URL-friendly slug
 */
export function toSlug(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove special characters except hyphens
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Remove leading hyphens
    .replace(/-+$/, ''); // Remove trailing hyphens
}

