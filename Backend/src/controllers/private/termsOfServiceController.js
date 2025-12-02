import TermsOfService from '../../models/TermsOfService.js';

export const getAllTermsOfService = async (req, res) => {
  try {
    const termsOfService = await TermsOfService.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ data: termsOfService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTermsOfServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const termsOfService = await TermsOfService.findByPk(id);
    
    if (!termsOfService) {
      return res.status(404).json({ error: 'Terms of Service not found' });
    }
    
    res.json({ data: termsOfService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTermsOfService = async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    const termsOfService = await TermsOfService.create({
      content,
      lastUpdated: new Date()
    });
    
    res.status(201).json({
      message: 'Terms of Service created successfully',
      data: termsOfService
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTermsOfService = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    const termsOfService = await TermsOfService.findByPk(id);
    if (!termsOfService) {
      return res.status(404).json({ error: 'Terms of Service not found' });
    }
    
    await termsOfService.update({
      content,
      lastUpdated: new Date()
    });
    
    res.json({
      message: 'Terms of Service updated successfully',
      data: termsOfService
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTermsOfService = async (req, res) => {
  try {
    const { id } = req.params;
    const termsOfService = await TermsOfService.findByPk(id);
    
    if (!termsOfService) {
      return res.status(404).json({ error: 'Terms of Service not found' });
    }
    
    await termsOfService.destroy();
    res.json({ message: 'Terms of Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

