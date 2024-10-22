const { SEO } = require('../../models/seo'); // Adjust the import based on your project structure

// Create SEO entry
exports.createSEO = async (req, res) => {
  try {
    const { title, description, url } = req.body;
    const seo = await SEO.create({ title, description, url });
    res.status(201).json(seo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating SEO entry', error: error.message });
  }
};

// Update SEO by ID
exports.updateSEOById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, url } = req.body;

    const seo = await SEO.findByPk(id);
    if (!seo) {
      return res.status(404).json({ message: 'SEO entry not found' });
    }

    await seo.update({ title, description, url });
    res.status(200).json(seo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating SEO entry', error: error.message });
  }
};

// Get SEO by ID
exports.getSEOById = async (req, res) => {
  try {
    const { id } = req.params;
    const seo = await SEO.findByPk(id);
    if (!seo) {
      return res.status(404).json({ message: 'SEO entry not found' });
    }
    res.status(200).json(seo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching SEO entry', error: error.message });
  }
};

// Get all SEO entries
exports.getAllSEO = async (req, res) => {
  try {
    const seoEntries = await SEO.findAll();
    res.status(200).json(seoEntries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching SEO entries', error: error.message });
  }
};

// Delete SEO by ID
exports.deleteSEOById = async (req, res) => {
  try {
    const { id } = req.params;
    const seo = await SEO.findByPk(id);
    if (!seo) {
      return res.status(404).json({ message: 'SEO entry not found' });
    }

    await seo.destroy();
    res.status(204).json(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: 'Error deleting SEO entry', error: error.message });
  }
};