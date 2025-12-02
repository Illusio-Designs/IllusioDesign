import PrivacyPolicy from '../../models/PrivacyPolicy.js';

export const getPrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findOne({
      order: [['createdAt', 'DESC']]
    });
    
    if (!privacyPolicy) {
      return res.status(404).json({ error: 'Privacy Policy not found' });
    }
    
    res.json({ data: privacyPolicy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

