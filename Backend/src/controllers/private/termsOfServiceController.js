// Legacy terms-of-service endpoints — kept for API compatibility but now
// backed by the unified `policies` table (type = 'terms').
import Policy from '../../models/Policy.js';

const TYPE = 'terms';

export const getAllTermsOfService = async (req, res) => {
  try {
    const rows = await Policy.findAll({ where: { type: TYPE } });
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTermsOfServiceById = async (req, res) => {
  try {
    const policy = await Policy.findOne({ where: { type: TYPE } });
    if (!policy) {
      return res.status(404).json({ error: 'Terms of Service not found' });
    }
    res.json({ data: policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upsert — there is only ever one terms-of-service row.
export const createTermsOfService = async (req, res) => {
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
    res.status(201).json({ message: 'Terms of Service saved successfully', data: policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTermsOfService = async (req, res) => {
  try {
    const { content } = req.body;
    let policy = await Policy.findOne({ where: { type: TYPE } });
    if (!policy) {
      if (!content) {
        return res.status(404).json({ error: 'Terms of Service not found' });
      }
      policy = await Policy.create({ type: TYPE, content: String(content), lastUpdated: new Date() });
    } else {
      await policy.update({
        content: content !== undefined ? String(content) : policy.content,
        lastUpdated: new Date()
      });
    }
    res.json({ message: 'Terms of Service updated successfully', data: policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTermsOfService = async (req, res) => {
  try {
    const policy = await Policy.findOne({ where: { type: TYPE } });
    if (!policy) {
      return res.status(404).json({ error: 'Terms of Service not found' });
    }
    await policy.destroy();
    res.json({ message: 'Terms of Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
