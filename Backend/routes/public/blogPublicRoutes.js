// routes/public/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/Public/blogPublicController');

// Get all published blogs
router.get('/', blogController.getAllBlogs);
router.get('/:title', blogController.getBlogByTitle);

// // Get a single blog by ID
// router.get('/:id', blogController.getBlogById);

// // Get a single blog by SEO-friendly URL
// router.get('/url/:url', blogController.getBlogByURL);

module.exports = router;
