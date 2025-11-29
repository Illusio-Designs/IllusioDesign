import express from 'express';
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../../controllers/private/teamController.js';
import { upload, convertToWebP } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', getAllTeamMembers);
router.get('/:id', getTeamMemberById);
router.post('/', upload.single('image'), convertToWebP, createTeamMember);
router.put('/:id', upload.single('image'), convertToWebP, updateTeamMember);
router.delete('/:id', deleteTeamMember);

export default router;

