/**
 * Custom Fetch Interceptor
 * Provides request and response interceptors for all API calls
 */

// Store for interceptors
const requestInterceptors = [];
const responseInterceptors = [];

// Current page context - tracks which page the user is on
let currentPageContext = null;

/**
 * Set the current page context
 * @param {string} page - The current page identifier (e.g., 'home', 'blog', 'blog-detail')
 */
export const setPageContext = (page) => {
  currentPageContext = page;
};

/**
 * Get the current page context
 * @returns {string|null} The current page identifier
 */
export const getPageContext = () => {
  return currentPageContext;
};

/**
 * Map API endpoint to page context
 * @param {string} url - API endpoint URL
 * @returns {string|null} The page context that matches this endpoint
 */
const getPageContextFromUrl = (url) => {
  if (!url) return null;
  
  // Check for blog detail (slug-based) - must check before general blog endpoint
  if (url.includes('/public/blogs/slug/')) {
    return 'blog-detail';
  }
  
  // Check for blog detail (ID-based)
  if (url.match(/\/public\/blogs\/\d+$/)) {
    return 'blog-detail';
  }
  
  // Check for case study detail (ID-based)
  if (url.match(/\/public\/case-studies\/\d+$/)) {
    return 'case-study-detail';
  }
  
  // Check for position detail (ID-based)
  if (url.match(/\/public\/positions\/\d+$/)) {
    return 'position-apply';
  }
  
  // Check for home page API calls FIRST (team, case studies list, blogs list for home page)
  // This must be checked before general endpoint mappings
  const isTeamCall = url.includes('/public/team');
  const isCaseStudyListCall = url.includes('/public/case-studies') && !url.match(/\/public\/case-studies\/\d+$/);
  const isBlogListCall = url.includes('/public/blogs') && !url.includes('/slug/') && !url.match(/\/public\/blogs\/\d+$/);
  
  if (isTeamCall || isCaseStudyListCall || isBlogListCall) {
    // If we're on home page, these are home page calls
    if (currentPageContext === 'home') {
      return 'home';
    }
    // If we're on service-detail page, case studies calls are for service-detail
    if (currentPageContext === 'service-detail' && isCaseStudyListCall) {
      return 'service-detail';
    }
  }
  
  // Map API endpoints to page contexts
  const endpointMappings = {
    '/public/blogs': 'blog',
    '/public/case-studies': 'case-study',
    '/public/positions': 'career',
    '/public/contact': 'contact',
    '/public/team': 'about',
    '/public/privacy-policy': 'privacy',
    '/public/terms-of-service': 'terms',
    '/public/applications': 'position-apply',
    '/public/positions/': 'position-apply', // Position detail API
    '/private/dashboard/stats': 'dashboard',
    '/private/dashboard/profile': 'dashboard',
    '/private/blogs': 'dashboard',
    '/private/case-studies': 'dashboard',
    '/private/positions': 'dashboard',
    '/private/applications': 'dashboard',
    '/private/contact-messages': 'dashboard',
    '/private/team': 'dashboard',
    '/private/seo': 'dashboard',
    '/private/admin/users': 'dashboard',
    '/private/privacy-policy': 'dashboard',
    '/private/terms-of-service': 'dashboard'
  };

  // Check for exact matches
  for (const [endpoint, page] of Object.entries(endpointMappings)) {
    if (url.includes(endpoint)) {
      return page;
    }
  }

  return null;
};

/**
 * Check if interceptors should run for this API call
 * @param {string} url - API endpoint URL
 * @param {boolean} skipInterceptors - Explicit skip flag
 * @returns {boolean} True if interceptors should run
 */
const shouldRunInterceptors = (url, skipInterceptors) => {
  // If explicitly skipped, don't run
  if (skipInterceptors) return false;

  // Get the page context for this API endpoint
  const endpointPageContext = getPageContextFromUrl(url);

  // If endpoint doesn't map to any page, don't run interceptors (skip unknown endpoints)
  if (!endpointPageContext) return false;

  // If no page context is set yet, don't run interceptors (wait for page context to be set)
  // Note: This doesn't prevent the API call itself, only the interceptors
  if (!currentPageContext) return false;

  // Only run interceptors if the endpoint matches the current page context
  return endpointPageContext === currentPageContext;
};

/**
 * Add a request interceptor
 * @param {Function} interceptor - Function that receives (config) and returns modified config
 */
export const addRequestInterceptor = (interceptor) => {
  requestInterceptors.push(interceptor);
};

/**
 * Add a response interceptor
 * @param {Function} interceptor - Function that receives (response) and returns modified response
 */
export const addResponseInterceptor = (interceptor) => {
  responseInterceptors.push(interceptor);
};

/**
 * Remove a request interceptor
 * @param {Function} interceptor - The interceptor function to remove
 */
export const removeRequestInterceptor = (interceptor) => {
  const index = requestInterceptors.indexOf(interceptor);
  if (index > -1) {
    requestInterceptors.splice(index, 1);
  }
};

/**
 * Remove a response interceptor
 * @param {Function} interceptor - The interceptor function to remove
 */
export const removeResponseInterceptor = (interceptor) => {
  const index = responseInterceptors.indexOf(interceptor);
  if (index > -1) {
    responseInterceptors.splice(index, 1);
  }
};

/**
 * Get auth token from localStorage
 */
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

/**
 * Clear auth data and redirect to login
 */
const handleUnauthorized = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    
    // Only redirect if not already on login/register page
    const currentPath = window.location.pathname;
    if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
      window.location.href = '/login';
    }
  }
};

/**
 * Apply request interceptors
 * @param {Object} config - Request configuration
 * @returns {Object} Modified configuration
 */
const applyRequestInterceptors = async (config) => {
  let modifiedConfig = { ...config };

  for (const interceptor of requestInterceptors) {
    try {
      modifiedConfig = await interceptor(modifiedConfig);
    } catch (error) {
      console.error('Request interceptor error:', error);
    }
  }

  return modifiedConfig;
};

/**
 * Apply response interceptors
 * @param {Response} response - Fetch response
 * @param {Object} config - Original request configuration
 * @returns {Response} Modified response
 */
const applyResponseInterceptors = async (response, config) => {
  let modifiedResponse = response;

  for (const interceptor of responseInterceptors) {
    try {
      modifiedResponse = await interceptor(modifiedResponse, config);
    } catch (error) {
      console.error('Response interceptor error:', error);
    }
  }

  return modifiedResponse;
};

/**
 * Custom fetch wrapper with interceptors
 * @param {string} url - Request URL
 * @param {Object} options - Fetch options (headers, method, body, etc.)
 * @param {Object} interceptorOptions - Additional options for interceptors
 * @param {boolean} interceptorOptions.isPublic - If true, skip auth token injection
 * @param {boolean} interceptorOptions.skipAuth - If true, skip auth token injection
 * @param {boolean} interceptorOptions.skipInterceptors - If true, skip request/response interceptors
 * @returns {Promise<Response>} Fetch response
 */
export const interceptedFetch = async (url, options = {}, interceptorOptions = {}) => {
  const { isPublic = false, skipAuth = false, skipInterceptors = false } = interceptorOptions;

  // Build initial config
  // Merge options first so we don't accidentally overwrite defaults (like headers)
  let config = {
    url,
    method: options.method || 'GET',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  };

  // Add auth token if not public and not skipped
  if (!isPublic && !skipAuth) {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  // Remove Content-Type for FormData (browser will set it automatically with boundary)
  if (config.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  // Apply request interceptors only if they should run for this page context
  if (shouldRunInterceptors(config.url, skipInterceptors)) {
    config = await applyRequestInterceptors(config);
  }

  // Extract URL and fetch options from config
  const { url: finalUrl, ...fetchOptions } = config;

  try {
    // Make the actual fetch request
    let response = await fetch(finalUrl, fetchOptions);

    // Clone response for error handling (response can only be read once)
    const responseClone = response.clone();

    // Apply response interceptors only if they should run for this page context
    if (shouldRunInterceptors(config.url, skipInterceptors)) {
      response = await applyResponseInterceptors(response, config);
    }

    // Handle 401 Unauthorized
    if (response.status === 401) {
      handleUnauthorized();
      
      // Try to get error message from response
      let errorMessage = 'Unauthorized. Please login again.';
      try {
        const errorData = await responseClone.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        // Response might not be JSON, use default message
      }
      throw new Error(errorMessage);
    }

    // Handle 403 Forbidden
    if (response.status === 403) {
      let errorMessage = 'Access forbidden. You do not have permission.';
      try {
        const errorData = await responseClone.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        // Response might not be JSON, use default message
      }
      throw new Error(errorMessage);
    }

    // Handle 500+ server errors
    if (response.status >= 500) {
      let errorMessage = 'Server error. Please try again later.';
      try {
        const errorData = await responseClone.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        // Response might not be JSON, use default message
      }
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection.');
    }
    
    // Re-throw other errors
    throw error;
  }
};

// Default request interceptor: Log requests in development
if (process.env.NODE_ENV === 'development') {
  addRequestInterceptor((config) => {
    console.log(`[API Request] ${config.method} ${config.url}`, {
      headers: config.headers,
      body: config.body instanceof FormData ? '[FormData]' : config.body
    });
    return config;
  });
}

// Default response interceptor: Log responses in development
if (process.env.NODE_ENV === 'development') {
  addResponseInterceptor(async (response, config) => {
    const clonedResponse = response.clone();
    try {
      // Handle 304 Not Modified - empty body
      if (response.status === 304) {
        console.log(`[API Response] ${config.method} ${config.url}`, {
          status: response.status,
          data: '[304 Not Modified - Empty body]'
        });
        return response;
      }
      
      // Try to parse JSON
      const text = await clonedResponse.text();
      if (text && text.trim().length > 0) {
        const data = JSON.parse(text);
        console.log(`[API Response] ${config.method} ${config.url}`, {
          status: response.status,
          data
        });
      } else {
        console.log(`[API Response] ${config.method} ${config.url}`, {
          status: response.status,
          data: '[Empty response body]'
        });
      }
    } catch (e) {
      console.log(`[API Response] ${config.method} ${config.url}`, {
        status: response.status,
        data: '[Non-JSON or parse error]',
        error: e.message
      });
    }
    return response;
  });
}

export default interceptedFetch;

