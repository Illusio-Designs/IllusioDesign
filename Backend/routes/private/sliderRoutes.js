const express = require('express');
const router = express.Router();
const sliderController = require('../../controllers/Private/sliderController');
const { authenticate } = require('../../middleware/auth'); // Import your authentication middleware
const { uploadSlider } = require('../../middleware/multerConfig'); // Import the upload configuration

// Create a new slider
router.post('/', authenticate, uploadSlider.single('image'), sliderController.createSlider);

// Update a slider by ID
router.put('/edit/:id', authenticate, uploadSlider.single('image'), sliderController.editSlider);

// Delete a slider by ID
router.delete('/delete/:id', authenticate, sliderController.deleteSlider);

// Get all sliders
router.get('/', authenticate, sliderController.getAllSliders);

module.exports = router;
