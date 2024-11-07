const express = require('express');
const router = express.Router();
const reviewController = require('../../controller/private/reviewController');
const authenticate = require('../../middleware/auth');


// Private route to get all reviews
router.get('/', authenticate, reviewController.getAllReviews);

// Private route to get a review by ID
router.get('/:id', authenticate, reviewController.getReviewById);

// Private route to approve a review
router.put('/approve/:id', authenticate, reviewController.approveReview);

// Private route to reject a review
router.delete('/:id', authenticate, reviewController.rejectReview);

module.exports = router; 