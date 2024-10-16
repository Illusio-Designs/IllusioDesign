// routes/private/seoRoutes.js
const express = require('express');
const router = express.Router();
const seoController = require('../../controllers/Private/seoController');
const { authenticate } = require('../../middleware/auth'); // Import your authentication middleware


// Create a new SEO entry
router.post('/', authenticate, seoController.createSEO);

// Update a SEO entry by ID
router.put('/:id', authenticate, seoController.updateSEO);

// Delete a SEO entry by ID
router.delete('/:id', authenticate, seoController.deleteSEO);

// (Optional) Get all SEO entries (for admin)
router.get('/', authenticate, seoController.getAllSEO);

module.exports = router;
