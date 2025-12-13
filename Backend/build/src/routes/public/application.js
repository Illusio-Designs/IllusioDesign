import express from 'express';
import { createApplication } from '../../controllers/public/applicationController.js';
import { upload } from '../../middleware/uploadResume.js';

const router = express.Router();

router.post('/', upload.single('resume'), createApplication);

export default router;

