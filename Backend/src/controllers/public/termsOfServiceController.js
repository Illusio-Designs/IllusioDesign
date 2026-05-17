// Legacy public terms-of-service endpoint — backed by the unified `policies`
// table (type = 'terms').
import Policy from '../../models/Policy.js';

export const getTermsOfService = async (req, res) => {
  try {
    const policy = await Policy.findOne({ where: { type: 'terms' } });
    if (!policy) {
      return res.status(404).json({ error: 'Terms of Service not found' });
    }
    res.json({ data: policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
