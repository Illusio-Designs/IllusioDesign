import TermsOfService from '../../models/TermsOfService.js';

export const getTermsOfService = async (req, res) => {
  try {
    const termsOfService = await TermsOfService.findOne({
      order: [['createdAt', 'DESC']]
    });
    
    if (!termsOfService) {
      return res.status(404).json({ error: 'Terms of Service not found' });
    }
    
    res.json({ data: termsOfService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

