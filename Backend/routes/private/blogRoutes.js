const express = require('express');
const router = express.Router();
const blogController = require('../../controller/private/blogController'); // Path to your controller
const upload = require('../../middleware/upload'); // Path to your multer config
const authenticate = require('../../middleware/auth'); // Path to your authentication middleware

// Route to create a new blog (with image upload)
router.post('/', authenticate, upload.single('blogimage'), blogController.createBlog);

// Route to update a blog by ID (with optional image upload)
router.put('/:id', authenticate, upload.single('blogimage'), blogController.updateBlogById);

// Route to get a blog by ID
router.get('/:id', authenticate, blogController.getBlogById);

// Route to delete a blog by ID
router.delete('/:id', authenticate, blogController.deleteBlogById);

// Route to get all blogs
router.get('/', authenticate, blogController.getAllBlogs);

module.exports = router;
