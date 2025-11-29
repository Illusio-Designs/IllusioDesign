import { SEO } from '../../models/SEO.js';

export const getAllSEO = async (req, res) => {
  try {
    const seoData = await SEO.findAll();
    res.json({ data: seoData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSEOByPage = async (req, res) => {
  try {
    const { page } = req.params;
    const seo = await SEO.findByPage(page);
    
    if (!seo) {
      return res.status(404).json({ error: 'SEO data not found for this page' });
    }
    
    res.json({ data: seo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSEO = async (req, res) => {
  try {
    const { page, title, description, keywords, ogImage, ogTitle, ogDescription } = req.body;
    
    if (!page) {
      return res.status(400).json({ error: 'Page identifier is required' });
    }
    
    // Check if SEO for this page already exists
    const existingSEO = await SEO.findByPage(page);
    if (existingSEO) {
      return res.status(400).json({ error: 'SEO data for this page already exists. Use update endpoint.' });
    }
    
    const ogImageUrl = req.file ? `/uploads/images/${req.file.filename}` : ogImage;
    
    const seo = await SEO.create({
      page,
      title: title || null,
      description: description || null,
      keywords: keywords || null,
      ogImage: ogImageUrl || null,
      ogTitle: ogTitle || null,
      ogDescription: ogDescription || null
    });
    
    res.status(201).json({ data: seo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSEO = async (req, res) => {
  try {
    const { page } = req.params;
    const updates = req.body;
    
    if (req.file) {
      updates.ogImage = `/uploads/images/${req.file.filename}`;
    }
    
    const seo = await SEO.updateByPage(page, updates);
    
    res.json({ data: seo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSEO = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SEO.deleteById(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'SEO data not found' });
    }
    
    res.json({ message: 'SEO data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

