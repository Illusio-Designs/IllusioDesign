import TermsOfService from '../../models/TermsOfService.js';

export const getTermsOfService = async (req, res) => {
  try {
    // Ensure UTF-8 encoding for response to preserve emojis
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const termsOfService = await TermsOfService.findAll({
      // Use updatedAt to always serve the latest edited terms
      order: [['updatedAt', 'DESC']],
      limit: 1
    });
    
    if (!termsOfService || termsOfService.length === 0) {
      return res.status(404).json({ error: 'Terms of Service not found' });
    }
    
    res.json({ data: termsOfService[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

