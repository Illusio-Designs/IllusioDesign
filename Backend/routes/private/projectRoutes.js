const express = require('express');
const router = express.Router();
const { uploadProjectImage } = require('../../config/multer');
const projectController = require('../../controllers/Private/projectController');
const authenticateJWT = require('../../middleware/authenticate'); // Import the authentication middleware

// Define the routes for project management
router.post('/', authenticateJWT, uploadProjectImage.single('image'), projectController.createProject);
router.get('/', authenticateJWT, projectController.getAllProjects);
router.put('/:id', authenticateJWT, uploadProjectImage.single('image'), projectController.updateProjectById);
router.delete('/:id', authenticateJWT, projectController.deleteProjectById);

module.exports = router;
