const express = require('express');
const seoController = require('../../controllers/Private/seoController');

const router = express.Router();

router.post('/create', seoController.createSeo);

module.exports = router;
