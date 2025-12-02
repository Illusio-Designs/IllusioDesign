import PrivacyPolicy from '../../models/PrivacyPolicy.js';

export const getAllPrivacyPolicies = async (req, res) => {
  try {
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
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    const privacyPolicy = await PrivacyPolicy.create({
      content,
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
    const { id } = req.params;
    const { content } = req.body;
    
    const privacyPolicy = await PrivacyPolicy.findByPk(id);
    if (!privacyPolicy) {
      return res.status(404).json({ error: 'Privacy Policy not found' });
    }
    
    await privacyPolicy.update({
      content,
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

