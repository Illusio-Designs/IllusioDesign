import express from 'express';
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../../controllers/private/teamController.js';
import { uploadTeam, convertToWebP } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', getAllTeamMembers);
router.get('/:id', getTeamMemberById);
router.post('/', uploadTeam.single('image'), convertToWebP, createTeamMember);
router.put('/:id', uploadTeam.single('image'), convertToWebP, updateTeamMember);
router.delete('/:id', deleteTeamMember);

export default router;

