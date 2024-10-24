// routes/blogRoutes.js

const express = require('express');
const router = express.Router();
const blogPublicController = require('../../controller/public/blogPublicController'); // Adjust the path to your controller

// Route to get all blogs
router.get('/', blogPublicController.getAllPublicBlogs);

// Route to get a blog by title
router.get('/:title', blogPublicController.getPublicBlogByTitle);

module.exports = router;
