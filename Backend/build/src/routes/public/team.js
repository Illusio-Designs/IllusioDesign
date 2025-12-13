import express from 'express';
import { getAllTeamMembers } from '../../controllers/public/teamController.js';

const router = express.Router();

router.get('/', getAllTeamMembers);

export default router;

