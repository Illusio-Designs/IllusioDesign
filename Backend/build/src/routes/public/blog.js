import express from 'express';
import { getAllBlogs, getBlogBySlug, getBlogById } from '../../controllers/public/blogController.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlogById);

export default router;

