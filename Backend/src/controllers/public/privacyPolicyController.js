// Legacy public privacy-policy endpoint — backed by the unified `policies`
// table (type = 'privacy').
import Policy from '../../models/Policy.js';

export const getPrivacyPolicy = async (req, res) => {
  try {
    const policy = await Policy.findOne({ where: { type: 'privacy' } });
    if (!policy) {
      return res.status(404).json({ error: 'Privacy Policy not found' });
    }
    res.json({ data: policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
