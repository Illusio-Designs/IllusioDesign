import Policy from '../../models/Policy.js';

const TYPES = ['privacy', 'terms'];

export const getPolicy = async (req, res) => {
  try {
    const { type } = req.params;
    if (!TYPES.includes(type)) {
      return res.status(400).json({ error: 'Invalid policy type. Use "privacy" or "terms".' });
    }
    const policy = await Policy.findOne({ where: { type } });
    if (!policy) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    res.json({ data: policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
