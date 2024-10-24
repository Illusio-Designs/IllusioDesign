const express = require('express');
const router = express.Router();
const blogController = require('../../controller/private/blogController'); // Adjust the path to your controller
const upload = require('../../middleware/upload'); // Adjust the path to your multer config
const authenticate = require('../../middleware/auth'); // Adjust the path to your middleware

// Route to create a new blog (with image upload)
router.post('/', authenticate, upload.single('image'), blogController.createBlog);

// Route to update a blog by ID (with optional image upload)
router.put('/:id', authenticate, upload.single('image'), blogController.updateBlogById);

// Route to get a blog by ID
router.get('/:id', authenticate, blogController.getBlogById);

// Route to delete a blog by ID
router.delete('/:id', authenticate, blogController.deleteBlogById);

// Route to get all blogs
router.get('/', authenticate, blogController.getAllBlogs);

module.exports = router;
