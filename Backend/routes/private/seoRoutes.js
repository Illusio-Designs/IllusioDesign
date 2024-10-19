const express = require('express');
const seoController = require('../../controllers/Private/seoController');
const authenticateJWT = require('../../middleware/authenticate'); // Import the authentication middleware

const router = express.Router();

router.post('/create', authenticateJWT, seoController.createSeo);
router.put('/:seoId', authenticateJWT, seoController.updateSeo);
router.delete('/:seoId', authenticateJWT, seoController.deleteSeo);

module.exports = router;
