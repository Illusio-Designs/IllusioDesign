const Slider = require('../../models/Slider');

// Create Slider
exports.createSlider = async (req, res) => {
    const { title, type } = req.body;
    const mediaUrl = req.file ? `/uploads/sliders/${req.file.filename}` : null;

    if (!mediaUrl) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const slider = await Slider.create({ title, type, mediaUrl });
        res.status(201).json(slider);
    } catch (error) {
        console.error('Error creating slider:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Edit Slider
exports.editSlider = async (req, res) => {
    const { id } = req.params;
    const { title, type } = req.body;
    const mediaUrl = req.file ? `/uploads/sliders/${req.file.filename}` : null;

    try {
        const slider = await Slider.findByPk(id);
        if (!slider) return res.status(404).json({ error: 'Slider not found' });

        await slider.update({ title, type, mediaUrl });
        res.json(slider);
    } catch (error) {
        console.error('Error updating slider:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Slider
exports.deleteSlider = async (req, res) => {
    const { id } = req.params;

    try {
        const slider = await Slider.findByPk(id);
        if (!slider) return res.status(404).json({ error: 'Slider not found' });

        await slider.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting slider:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Sliders
exports.getAllSliders = async (req, res) => {
    try {
        const sliders = await Slider.findAll();
        res.json(sliders);
    } catch (error) {
        console.error('Error fetching sliders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
