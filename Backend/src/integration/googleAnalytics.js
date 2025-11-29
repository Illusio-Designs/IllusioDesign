import axios from "axios";

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;
const GA_API_SECRET = process.env.GA_API_SECRET;

/**
 * Send event to Google Analytics
 * @param {Object} eventData - Event data
 * @param {string} eventData.client_id - Client ID
 * @param {string} eventData.event_name - Event name
 * @param {Object} eventData.params - Event parameters
 * @returns {Promise}
 */
export const sendGAEvent = async (eventData) => {
    if (!GA_MEASUREMENT_ID || !GA_API_SECRET) {
        console.warn('Google Analytics credentials not configured');
        return { success: false, message: 'GA not configured' };
    }

    const payload = {
        client_id: eventData.client_id,
        events: [
            {
                name: eventData.event_name,
                params: eventData.params || {}
            }
        ]
    };

    try {
        await axios.post(
            `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
            payload
        );
        return { success: true };
    } catch (error) {
        console.error("Google Analytics Error:", error.message);
        return { success: false, error: error.message };
    }
};

/**
 * Track page view
 * @param {string} pagePath - Page path
 * @param {string} pageTitle - Page title
 * @param {string} clientId - Client ID (optional)
 * @returns {Promise}
 */
export const trackPageView = async (pagePath, pageTitle, clientId = 'anonymous') => {
    return await sendGAEvent({
        client_id: clientId,
        event_name: 'page_view',
        params: {
            page_path: pagePath,
            page_title: pageTitle
        }
    });
};

/**
 * Track contact form submission
 * @param {string} clientId - Client ID
 * @returns {Promise}
 */
export const trackContactForm = async (clientId = 'anonymous') => {
    return await sendGAEvent({
        client_id: clientId,
        event_name: 'contact_form_submit',
        params: {
            event_category: 'engagement',
            event_label: 'contact_form'
        }
    });
};

/**
 * Track job application
 * @param {string} positionId - Position ID
 * @param {string} clientId - Client ID
 * @returns {Promise}
 */
export const trackJobApplication = async (positionId, clientId = 'anonymous') => {
    return await sendGAEvent({
        client_id: clientId,
        event_name: 'job_application',
        params: {
            event_category: 'engagement',
            event_label: 'job_application',
            position_id: positionId
        }
    });
};

