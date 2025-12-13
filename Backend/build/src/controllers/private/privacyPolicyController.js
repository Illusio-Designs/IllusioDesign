import PrivacyPolicy from '../../models/PrivacyPolicy.js';

export const getAllPrivacyPolicies = async (req, res) => {
  try {
    // Ensure UTF-8 encoding for response to preserve emojis
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const privacyPolicies = await PrivacyPolicy.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ data: privacyPolicies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPrivacyPolicyById = async (req, res) => {
  try {
    // Ensure UTF-8 encoding for response to preserve emojis
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const { id } = req.params;
    const privacyPolicy = await PrivacyPolicy.findByPk(id);
    
    if (!privacyPolicy) {
      return res.status(404).json({ error: 'Privacy Policy not found' });
    }
    
    res.json({ data: privacyPolicy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPrivacyPolicy = async (req, res) => {
  try {
    // Ensure UTF-8 encoding for response
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    // Ensure content is properly decoded as UTF-8 string to preserve emojis
    const decodedContent = content ? String(content) : '';
    
    const privacyPolicy = await PrivacyPolicy.create({
      content: decodedContent, // Use decoded content to preserve emojis
      lastUpdated: new Date()
    });
    
    res.status(201).json({
      message: 'Privacy Policy created successfully',
      data: privacyPolicy
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePrivacyPolicy = async (req, res) => {
  try {
    // Ensure UTF-8 encoding for response
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const { id } = req.params;
    const { content } = req.body;
    
    const privacyPolicy = await PrivacyPolicy.findByPk(id);
    if (!privacyPolicy) {
      return res.status(404).json({ error: 'Privacy Policy not found' });
    }
    
    // Ensure content is properly decoded as UTF-8 string if present
    const decodedContent = content !== undefined ? String(content) : content;
    
    await privacyPolicy.update({
      content: decodedContent, // Use decoded content to preserve emojis
      lastUpdated: new Date()
    });
    
    res.json({
      message: 'Privacy Policy updated successfully',
      data: privacyPolicy
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePrivacyPolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const privacyPolicy = await PrivacyPolicy.findByPk(id);
    
    if (!privacyPolicy) {
      return res.status(404).json({ error: 'Privacy Policy not found' });
    }
    
    await privacyPolicy.destroy();
    res.json({ message: 'Privacy Policy deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

