const express = require('express');
const router = express.Router();
const seoController = require('../../controller/private/seoController');
const authenticate = require('../../middleware/auth'); // Ensure you have an authentication middleware

// Apply authentication middleware if needed
router.use(authenticate);

// Define routes for SEO
router.post('/', seoController.createSEO);
router.put('/:id', seoController.updateSEOById);
router.get('/:id', seoController.getSEOById);
router.get('/', seoController.getAllSEO);
router.delete('/:id', seoController.deleteSEOById);

module.exports = router;