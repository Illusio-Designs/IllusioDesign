// controllers/private/seoController.js
const SEO = require('../../models/SEO');

// Create SEO entry (if managing separately)
exports.createSEO = async (req, res) => {
  const { metaDescription, title, url } = req.body;

  try {
    const seo = await SEO.create({ metaDescription, title, url });
    res.status(201).json(seo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update SEO entry
exports.updateSEO = async (req, res) => {
  const { id } = req.params;
  const { metaDescription, title, url } = req.body;

  try {
    const seo = await SEO.findByPk(id);
    if (!seo) {
      return res.status(404).json({ message: 'SEO entry not found' });
    }

    seo.metaDescription = metaDescription || seo.metaDescription;
    seo.title = title || seo.title;
    seo.url = url || seo.url;
    await seo.save();

    res.status(200).json(seo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete SEO entry
exports.deleteSEO = async (req, res) => {
  const { id } = req.params;

  try {
    const seo = await SEO.findByPk(id);
    if (!seo) {
      return res.status(404).json({ message: 'SEO entry not found' });
    }

    await seo.destroy();
    res.status(200).json({ message: 'SEO entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// (Optional) Get all SEO entries (for admin purposes)
exports.getAllSEO = async (req, res) => {
  try {
    const seos = await SEO.findAll();
    res.status(200).json(seos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
