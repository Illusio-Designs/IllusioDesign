// controllers/publicSliderController.js
const Slider = require('../../models/Slider'); // Adjust the path as necessary

// Get all sliders
exports.getAllSliders = async (req, res) => {
    try {
        const sliders = await Slider.findAll();
        res.json(sliders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

