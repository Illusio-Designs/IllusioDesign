// routes/private/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/Private/blogController');
const { authenticate } = require('../../middleware/auth'); // Import your authentication middleware

// All routes here are protected
console.log('Blog Controller:', blogController);

// Create a new blog
router.post('/', authenticate, blogController.createBlog);

// Update a blog by ID
router.put('/:id', authenticate, blogController.updateBlog);

// Delete a blog by ID
router.delete('/:id', authenticate, blogController.deleteBlog);

// (Optional) Get all blogs (for admin)
router.get('/', authenticate, blogController.getAllBlogs);

module.exports = router;
