// controllers/privateSliderController.js
const multer = require('multer');
const path = require('path');
const Slider = require('../../models/Slider'); // Adjust the path as necessary

// Set up Multer storage for slider media uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/sliders'); // Define the upload folder for sliders
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    },
});

const upload = multer({ storage: storage }).single('media'); // Use single file upload for media

// Create a new slider
exports.createSlider = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'Image upload failed' });
        }
        try {
            const { title, type } = req.body;
            const mediaUrl = req.file.path; // Assuming the media is uploaded successfully

            const slider = await Slider.create({ title, type, mediaUrl });
            res.status(201).json(slider);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};

// Edit an existing slider
exports.editSlider = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'Image upload failed' });
        }
        try {
            const { id } = req.params;
            const { title, type } = req.body;
            const mediaUrl = req.file ? req.file.path : undefined; // Check if a new file is uploaded

            const slider = await Slider.findByPk(id);
            if (!slider) return res.status(404).json({ error: 'Slider not found' });

            await slider.update({ title, type, mediaUrl });
            res.json(slider);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};

// Delete a slider
exports.deleteSlider = async (req, res) => {
    try {
        const { id } = req.params;
        const slider = await Slider.findByPk(id);
        if (!slider) return res.status(404).json({ error: 'Slider not found' });

        await slider.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all sliders
exports.getAllSliders = async (req, res) => {
    try {
        const sliders = await Slider.findAll();
        res.json(sliders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
