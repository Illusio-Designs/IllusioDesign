// routes/blogRoutes.js
const express = require('express');
const blogController = require('../../controller/private/blogController');
const upload = require('../../middleware/upload');
const authMiddleware = require('../../middleware/auth'); // Assuming you have an auth middleware
const router = express.Router();

// Create a new blog post (protected route with file upload)
router.post('/',
  authMiddleware, 
  upload.single('blogImage'), // for uploading a single image
  blogController.createBlog
);

// Get all blog posts
router.get('/', blogController.getAllBlogs);

// Get a single blog post by ID
router.get('/:id', blogController.getBlogById);

// Update a blog post by ID (protected route with file upload)
router.put('/:id',
  authMiddleware, 
  upload.single('blogImage'), 
  blogController.updateBlogById
);

// Delete a blog post by ID (protected route)
router.delete('/:id',
  authMiddleware, 
  blogController.deleteBlogById
);

module.exports = router;
