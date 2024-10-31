const Seo = require('../../models/seo');
const defaultSeoData = require('../../constants/defaultSeoData'); // Adjust the path to where you saved defaultSeoData.js

exports.initializeDefaultSeo = async (req, res) => {
  try {
    for (const seo of defaultSeoData) {
      const existingSeo = await SeoModel.findOne({ page_url: seo.page_url });
      if (!existingSeo) {
        const newSeo = new SeoModel(seo);
        await newSeo.save();
      }
    }
    res.status(200).json({ message: 'Default SEO data initialized.' });
  } catch (error) {
    console.error('Error initializing SEO data:', error);
    res.status(500).json({ message: 'Error initializing SEO data.' });
  }
};
// Get all SEO entries
exports.getAllPublicSeo = async (req, res) => {
  try {
    const seoEntries = await Seo.findAll();
    res.status(200).json(seoEntries);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving SEO entries", error });
  }
};

// Get a single SEO entry by ID
exports.getPublicSeoById = async (req, res) => {
  try {
    const seoEntry = await Seo.findByPk(req.params.id);
    if (!seoEntry) {
      return res.status(404).json({ message: "SEO entry not found" });
    }
    res.status(200).json(seoEntry);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving SEO entry", error });
  }
};

