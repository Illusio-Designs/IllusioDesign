const Seo = require('../../models/seo');

// Create a new SEO entry
exports.createSeo = async (req, res) => {
  try {
    const seoData = await Seo.create(req.body);
    res.status(201).json(seoData);
  } catch (error) {
    res.status(500).json({ message: "Error creating SEO entry", error });
  }
};

// Get all SEO entries
exports.getAllSeo = async (req, res) => {
  try {
    const seoEntries = await Seo.findAll();
    res.status(200).json(seoEntries);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving SEO entries", error });
  }
};

// Get a single SEO entry by ID
exports.getSeoById = async (req, res) => {
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

// Update an SEO entry by ID
exports.updateSeo = async (req, res) => {
  try {
    const seoEntry = await Seo.findByPk(req.params.id);
    if (!seoEntry) {
      return res.status(404).json({ message: "SEO entry not found" });
    }
    await seoEntry.update(req.body);
    res.status(200).json(seoEntry);
  } catch (error) {
    res.status(500).json({ message: "Error updating SEO entry", error });
  }
};

// Delete an SEO entry by ID
exports.deleteSeo = async (req, res) => {
  try {
    const seoEntry = await Seo.findByPk(req.params.id);
    if (!seoEntry) {
      return res.status(404).json({ message: "SEO entry not found" });
    }
    await seoEntry.destroy();
    res.status(200).json({ message: "SEO entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting SEO entry", error });
  }
};
