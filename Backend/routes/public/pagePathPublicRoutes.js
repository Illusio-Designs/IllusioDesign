const express = require('express');
const router = express.Router();
const pagePathPublicController = require('../../controllers/Public/pagePathPublicController');

// Route to create or save page paths
router.post('/', pagePathPublicController.savePagePath);

// Route to get all page paths
router.get('/', pagePathPublicController.getPagePaths);

module.exports = router;
