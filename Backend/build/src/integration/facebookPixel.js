import axios from "axios";

const FB_PIXEL_ID = process.env.FB_PIXEL_ID;
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

/**
 * Send event to Facebook Pixel
 * @param {Object} eventData - Event data
 * @param {string} eventData.event_name - Event name
 * @param {Object} eventData.user_data - User data
 * @param {Object} eventData.custom_data - Custom event data
 * @returns {Promise}
 */
export const sendFBEvent = async (eventData) => {
    if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) {
        console.warn('Facebook Pixel credentials not configured');
        return { success: false, message: 'FB Pixel not configured' };
    }

    const payload = {
        event_name: eventData.event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventData.event_source_url || 'https://illusiodesign.com',
        action_source: 'website',
        user_data: eventData.user_data || {},
        custom_data: eventData.custom_data || {}
    };

    try {
        await axios.post(
            `https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`,
            { data: [payload] }
        );
        return { success: true };
    } catch (error) {
        console.error("Facebook Pixel Error:", error.response?.data || error.message);
        return { success: false, error: error.message };
    }
};

/**
 * Track page view
 * @param {string} pagePath - Page path
 * @param {Object} userData - User data (optional)
 * @returns {Promise}
 */
export const trackPageView = async (pagePath, userData = {}) => {
    return await sendFBEvent({
        event_name: 'PageView',
        event_source_url: `https://illusiodesign.com${pagePath}`,
        user_data: userData,
        custom_data: {
            content_name: pagePath
        }
    });
};

/**
 * Track contact form submission
 * @param {Object} contactData - Contact form data
 * @returns {Promise}
 */
export const trackContactForm = async (contactData = {}) => {
    return await sendFBEvent({
        event_name: 'Contact',
        user_data: {
            client_ip_address: contactData.ip_address,
            client_user_agent: contactData.user_agent
        },
        custom_data: {
            content_name: 'Contact Form Submission'
        }
    });
};

/**
 * Track job application
 * @param {string} positionId - Position ID
 * @param {Object} userData - User data (optional)
 * @returns {Promise}
 */
export const trackJobApplication = async (positionId, userData = {}) => {
    return await sendFBEvent({
        event_name: 'CompleteRegistration',
        user_data: userData,
        custom_data: {
            content_name: 'Job Application',
            content_ids: [positionId],
            content_type: 'job_application'
        }
    });
};

