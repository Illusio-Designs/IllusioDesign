import SEO from '../../models/SEO.js';

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

