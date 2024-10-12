// routes/privateSliderRoutes.js
const express = require('express');
const privateSliderController = require('../../controllers/Private/sliderController'); // Ensure this path is correct
const { authenticate } = require('../../middleware/auth'); // Import your authentication middleware

const router = express.Router();

// Debugging: Check if privateSliderController is loaded correctly
console.log('Slider Controller:', privateSliderController);

// Create a new slider (POST /api/sliders/upload)
router.post('/upload', authenticate, privateSliderController.createSlider);

// Update an existing slider by ID (PUT /api/sliders/edit/:id)
router.put('/edit/:id', authenticate, privateSliderController.editSlider);

// Delete a slider by ID (DELETE /api/sliders/delete/:id)
router.delete('/delete/:id', authenticate, privateSliderController.deleteSlider);

// Get all sliders (GET /api/sliders)
router.get('/', authenticate, privateSliderController.getAllSliders); // Ensure this function exists

module.exports = router; // Export the private routes
