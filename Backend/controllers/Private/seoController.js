const Seo = require('../../models/seoModel');

exports.createSeo = async (req, res) => {
  try {
    const { title, description, url } = req.body;
    const seo = await Seo.create({ title, description, url });
    res.status(201).json(seo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add more SEO-related methods as needed
