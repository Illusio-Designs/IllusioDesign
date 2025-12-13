import PrivacyPolicy from '../../models/PrivacyPolicy.js';

export const getPrivacyPolicy = async (req, res) => {
  try {
    // Ensure UTF-8 encoding for response to preserve emojis
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const privacyPolicy = await PrivacyPolicy.findAll({
      // Use updatedAt to always serve the latest edited policy
      order: [['updatedAt', 'DESC']],
      limit: 1
    });
    
    if (!privacyPolicy || privacyPolicy.length === 0) {
      return res.status(404).json({ error: 'Privacy Policy not found' });
    }
    
    res.json({ data: privacyPolicy[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

