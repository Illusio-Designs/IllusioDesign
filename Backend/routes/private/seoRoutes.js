const express = require('express');
const router = express.Router();
const seoController = require('../../controller/private/seoController');
const authenticate = require('../../middleware/auth');

// Create a new SEO entry
router.post('/', authenticate, seoController.createSeo);

// Get all SEO entries
router.get('/', authenticate, seoController.getAllSeo);

// Get a single SEO entry by ID
router.get('/:id', authenticate, seoController.getSeoById);

// Update an SEO entry by ID
router.put('/:id', authenticate, seoController.updateSeo);

// Delete an SEO entry by ID
router.delete('/:id', authenticate, seoController.deleteSeo);

module.exports = router;
