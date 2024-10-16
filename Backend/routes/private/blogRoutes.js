const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/Private/blogController');
const { authenticate } = require('../../middleware/auth');
const { uploadBlog } = require('../../middleware/multerConfig'); // Destructure uploadBlog middleware

// Route to create a new blog post with image upload, authentication required
router.post('/', authenticate, uploadBlog.single('image'), blogController.createBlog);

// Route to update an existing blog post with image upload, authentication required
router.put('/:id', authenticate, uploadBlog.single('image'), blogController.updateBlog);

// Route to delete a blog post, authentication required
router.delete('/:id', authenticate, blogController.deleteBlog);

// Route to get all blogs, authentication required
router.get('/', authenticate, blogController.getAllBlogs);

// Separate route for image upload, authentication required
router.post('/uploads', authenticate, uploadBlog.single('image'), blogController.uploadImage);

module.exports = router;
