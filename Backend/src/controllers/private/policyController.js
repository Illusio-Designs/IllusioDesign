import Policy from '../../models/Policy.js';

const TYPES = ['privacy', 'terms'];

export const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.findAll({ order: [['type', 'ASC']] });
    res.json({ data: policies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPolicyByType = async (req, res) => {
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

// Create or update the policy for a given type (one row per type).
export const upsertPolicy = async (req, res) => {
  try {
    const { type } = req.params;
    if (!TYPES.includes(type)) {
      return res.status(400).json({ error: 'Invalid policy type. Use "privacy" or "terms".' });
    }
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    const decodedContent = String(content);

    let policy = await Policy.findOne({ where: { type } });
    if (policy) {
      await policy.update({ content: decodedContent, lastUpdated: new Date() });
    } else {
      policy = await Policy.create({ type, content: decodedContent, lastUpdated: new Date() });
    }

    res.json({ message: 'Policy saved successfully', data: policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePolicy = async (req, res) => {
  try {
    const { type } = req.params;
    if (!TYPES.includes(type)) {
      return res.status(400).json({ error: 'Invalid policy type. Use "privacy" or "terms".' });
    }
    const policy = await Policy.findOne({ where: { type } });
    if (!policy) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    await policy.destroy();
    res.json({ message: 'Policy deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
