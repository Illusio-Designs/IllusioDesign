// Legacy privacy-policy endpoints — kept for API compatibility but now
// backed by the unified `policies` table (type = 'privacy').
import Policy from '../../models/Policy.js';

const TYPE = 'privacy';

export const getAllPrivacyPolicies = async (req, res) => {
  try {
    const rows = await Policy.findAll({ where: { type: TYPE } });
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPrivacyPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findOne({ where: { type: TYPE } });
    if (!policy) {
      return res.status(404).json({ error: 'Privacy Policy not found' });
    }
    res.json({ data: policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upsert — there is only ever one privacy policy row.
export const createPrivacyPolicy = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    const decodedContent = String(content);
    let policy = await Policy.findOne({ where: { type: TYPE } });
    if (policy) {
      await policy.update({ content: decodedContent, lastUpdated: new Date() });
    } else {
      policy = await Policy.create({ type: TYPE, content: decodedContent, lastUpdated: new Date() });
    }
    res.status(201).json({ message: 'Privacy Policy saved successfully', data: policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePrivacyPolicy = async (req, res) => {
  try {
    const { content } = req.body;
    let policy = await Policy.findOne({ where: { type: TYPE } });
    if (!policy) {
      if (!content) {
        return res.status(404).json({ error: 'Privacy Policy not found' });
      }
      policy = await Policy.create({ type: TYPE, content: String(content), lastUpdated: new Date() });
    } else {
      await policy.update({
        content: content !== undefined ? String(content) : policy.content,
        lastUpdated: new Date()
      });
    }
    res.json({ message: 'Privacy Policy updated successfully', data: policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePrivacyPolicy = async (req, res) => {
  try {
    const policy = await Policy.findOne({ where: { type: TYPE } });
    if (!policy) {
      return res.status(404).json({ error: 'Privacy Policy not found' });
    }
    await policy.destroy();
    res.json({ message: 'Privacy Policy deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
