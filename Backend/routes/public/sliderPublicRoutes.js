// routes/publicSliderRoutes.js
const express = require('express');
const publicSliderController = require('../../controllers/Public/sliderPublicController');

const router = express.Router();

// Public route to get all sliders
router.get('/', publicSliderController.getAllSliders);

module.exports = router;

