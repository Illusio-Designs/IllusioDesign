const express = require('express');
const router = express.Router();
const pagePathController = require('../../controllers/Private/pagePathController');

// Route to GET all page paths
router.get('/', pagePathController.getPagePaths);

// Route to GET a specific page path by ID
router.get('/:id', pagePathController.getPagePathById);

// Route to DELETE a specific page path by ID
router.delete('/:id', pagePathController.deletePagePath);

module.exports = router;
