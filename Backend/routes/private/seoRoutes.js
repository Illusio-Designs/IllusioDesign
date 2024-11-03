const express = require('express');
const router = express.Router();
const seoController = require('../../controller/private/seoController');
const authenticate = require('../../middleware/auth');


// Get all SEO entries
router.get('/', authenticate, seoController.getAllSeo);

// Get a single SEO entry by ID
router.get('/:id', authenticate, seoController.getSeoById);

// Update an SEO entry by ID
router.put('/:id', authenticate, seoController.updateSeo);



module.exports = router;
