const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/Private/blogController');
const { authenticate } = require('../../middleware/auth');

console.log('Blog Controller:', blogController);

// Use the upload middleware for creating and updating blogs
router.post('/', authenticate, blogController.upload.single('image'), blogController.createBlog);
router.put('/:id', authenticate, blogController.upload.single('image'), blogController.updateBlog);
router.delete('/:id', authenticate, blogController.deleteBlog);
router.get('/', authenticate, blogController.getAllBlogs);
router.post('/uploads', authenticate, blogController.upload.single('image'), blogController.uploadImage);

module.exports = router;