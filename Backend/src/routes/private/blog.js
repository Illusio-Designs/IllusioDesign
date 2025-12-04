import express from 'express';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} from '../../controllers/private/blogController.js';
import { uploadBlog, convertToWebP } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', uploadBlog.single('image'), convertToWebP, createBlog);
router.put('/:id', uploadBlog.single('image'), convertToWebP, updateBlog);
router.delete('/:id', deleteBlog);

export default router;

