const express = require('express');
const blogController = require('../../controllers/Private/blogController');
// const upload = require('../../config/multer');

const router = express.Router();

router.post('/create', blogController.createBlog);

module.exports = router;
