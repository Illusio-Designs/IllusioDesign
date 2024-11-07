const express = require('express');
const router = express.Router();
const reviewPublicController = require('../../controller/public/reviewPublicController');

// Public route to create a review
router.post('/', reviewPublicController.createReview);

router.get('/', reviewPublicController.getAllReviews);


module.exports = router; 