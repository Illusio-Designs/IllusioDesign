// routes/public/seoRoutes.js
const express = require('express');
const router = express.Router();
const seoController = require('../../controllers/Public/seoPublicController');

// Get SEO data by URL
router.get('/:url', seoController.getSEOByURL);

module.exports = router;
