// controllers/public/seoController.js
const SEO = require('../../models/SEO');

// Get SEO data by URL
exports.getSEOByURL = async (req, res) => {
  const { url } = req.params;

  try {
    const seo = await SEO.findOne({ where: { url } });
    if (!seo) {
      return res.status(404).json({ message: 'SEO data not found' });
    }
    res.status(200).json(seo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
