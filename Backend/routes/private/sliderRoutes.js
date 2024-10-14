const express = require('express');
const router = express.Router();
const sliderController = require('../../controllers/Private/sliderController');
const { authenticate } = require('../../middleware/auth'); // Import your authentication middleware
const multer = require('multer');
const upload = multer({ dest: 'uploads/sliders' }); // Set your upload destination

// Create a new slider
router.post('/', authenticate, upload.single('image'), sliderController.createSlider);

// Update a slider by ID
router.put('/edit/:id', authenticate, upload.single('image'), sliderController.editSlider);

// Delete a slider by ID
router.delete('/delete/:id', authenticate, sliderController.deleteSlider);

// Get all sliders
router.get('/', authenticate, sliderController.getAllSliders);

module.exports = router;
