import { Content } from '../../models/Content.js';

export const getAllPublicContent = async (req, res) => {
  try {
    const content = await Content.findPublished();
    res.json({ data: content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPublicContentById = async (req, res) => {
  try {
    const content = await Content.findById(parseInt(req.params.id));
    
    if (!content || !content.published) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json({ data: content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
