const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/Public/projectPublicController');

// Public routes
router.get('/', projectController.getAllProjects); // Get all projects
router.get('/:title', projectController.getProjectByTitle);


module.exports = router; // Export the public routes
