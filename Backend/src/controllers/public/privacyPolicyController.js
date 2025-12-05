import PrivacyPolicy from '../../models/PrivacyPolicy.js';

export const getPrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findAll({
      order: [['createdAt', 'DESC']],
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

