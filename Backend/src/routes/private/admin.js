import express from 'express';
import {
  getAllContent,
  createContent,
  updateContent,
  deleteContent,
  getAllUsers,
  updateUserRole,
  deleteUser
} from '../../controllers/private/adminController.js';
import {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  getAllImages
} from '../../controllers/private/imageController.js';
import { upload, convertToWebP, convertMultipleToWebP } from '../../middleware/upload.js';

const router = express.Router();

// Content management routes
router.get('/content', getAllContent);
router.post('/content', upload.single('image'), convertToWebP, createContent);
router.put('/content/:id', upload.single('image'), convertToWebP, updateContent);
router.delete('/content/:id', deleteContent);

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Image upload routes
router.post('/images/upload', upload.single('image'), convertToWebP, uploadImage);
router.post('/images/upload-multiple', upload.array('images', 10), convertMultipleToWebP, uploadMultipleImages);
router.get('/images', getAllImages);
router.delete('/images/:filename', deleteImage);

export default router;
