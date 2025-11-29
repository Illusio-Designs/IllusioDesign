import express from 'express';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} from '../../controllers/private/blogController.js';
import { upload, convertToWebP } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', upload.single('image'), convertToWebP, createBlog);
router.put('/:id', upload.single('image'), convertToWebP, updateBlog);
router.delete('/:id', deleteBlog);

export default router;

