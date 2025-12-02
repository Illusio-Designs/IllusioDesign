import SEO from '../../models/SEO.js';

export const getAllSEO = async (req, res) => {
  try {
    const seoData = await SEO.findAll({
      order: [['page', 'ASC']]
    });
    res.json({ data: seoData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSEOByPage = async (req, res) => {
  try {
    const { page } = req.params;
    const seo = await SEO.findOne({ where: { page } });
    
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
    const { page, title, description, keywords, ogTitle, ogDescription } = req.body;
    const ogImage = req.file ? `/uploads/images/${req.file.filename}` : req.body.ogImage;
    
    if (!page) {
      return res.status(400).json({ error: 'Page is required' });
    }
    
    // Check if SEO for this page already exists
    const existingSEO = await SEO.findOne({ where: { page } });
    if (existingSEO) {
      return res.status(400).json({ error: 'SEO data for this page already exists. Use update instead.' });
    }
    
    const seo = await SEO.create({
      page,
      title: title || null,
      description: description || null,
      keywords: keywords || null,
      ogImage: ogImage || null,
      ogTitle: ogTitle || title || null,
      ogDescription: ogDescription || description || null
    });
    
    res.status(201).json({ data: seo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSEO = async (req, res) => {
  try {
    const { page } = req.params;
    const updates = { ...req.body };
    
    if (req.file) {
      updates.ogImage = `/uploads/images/${req.file.filename}`;
    }
    
    // Set ogTitle and ogDescription if not provided but title/description are
    if (!updates.ogTitle && updates.title) {
      updates.ogTitle = updates.title;
    }
    if (!updates.ogDescription && updates.description) {
      updates.ogDescription = updates.description;
    }
    
    const seo = await SEO.findOne({ where: { page } });
    if (!seo) {
      // Create if doesn't exist
      const newSEO = await SEO.create({
        page,
        ...updates
      });
      return res.json({ data: newSEO });
    }
    
    await seo.update(updates);
    res.json({ data: seo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSEO = async (req, res) => {
  try {
    const { id } = req.params;
    const seo = await SEO.findByPk(id);
    
    if (!seo) {
      return res.status(404).json({ error: 'SEO data not found' });
    }
    
    await seo.destroy();
    res.json({ message: 'SEO data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
