const express = require('express');
const router = express.Router();
const seoController = require('../../controller/public/seoPublicController');



// Get all SEO entries
router.get('/',  seoController.getAllPublicSeo);

// Get a single SEO entry by ID
router.get('/:id',  seoController.getPublicSeoById);

// Initialize default SEO data
router.post('/initialize-default', seoController.initializeDefaultSeo);

module.exports = router;
