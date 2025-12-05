import TermsOfService from '../../models/TermsOfService.js';

export const getTermsOfService = async (req, res) => {
  try {
    const termsOfService = await TermsOfService.findAll({
      order: [['createdAt', 'DESC']],
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

