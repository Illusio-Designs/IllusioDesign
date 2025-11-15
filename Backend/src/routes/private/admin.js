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

const router = express.Router();

// Content management routes
router.get('/content', getAllContent);
router.post('/content', createContent);
router.put('/content/:id', updateContent);
router.delete('/content/:id', deleteContent);

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

export default router;
