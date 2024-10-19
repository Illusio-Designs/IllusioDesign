const Seo = require('../../models/seoModel');

// Create a new SEO entry
exports.createSeo = async (req, res) => {
    try {
        const { title, description, url } = req.body;
        const seo = await Seo.create({ title, description, url });
        res.status(201).json(seo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing SEO entry
exports.updateSeo = async (req, res) => {
    const { seoId } = req.params;
    const { title, description, url } = req.body;

    try {
        const seo = await Seo.findByIdAndUpdate(seoId, { title, description, url }, { new: true });
        if (!seo) {
            return res.status(404).json({ error: 'SEO entry not found' });
        }
        res.status(200).json(seo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an SEO entry
exports.deleteSeo = async (req, res) => {
    const { seoId } = req.params;
    try {
        const seo = await Seo.findByIdAndDelete(seoId);
        if (!seo) {
            return res.status(404).json({ error: 'SEO entry not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
