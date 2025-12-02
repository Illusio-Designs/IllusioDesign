import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
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

// User management routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Image upload routes
router.post('/images/upload', upload.single('image'), convertToWebP, uploadImage);
router.post('/images/upload-multiple', upload.array('images', 10), convertMultipleToWebP, uploadMultipleImages);
router.get('/images', getAllImages);
router.delete('/images/:filename', deleteImage);

export default router;
