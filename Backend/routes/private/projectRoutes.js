const express = require('express');
const router = express.Router();
const projectController = require('../../controller/private/projectController');
const upload = require('../../middleware/upload');
const authenticate = require('../../middleware/auth'); // JWT middleware for protected routes

// Create project with image upload
router.post('/', authenticate, upload.single('projectImage'), projectController.createProject);

// Get all projects (Protected route)
router.get('/', authenticate, projectController.getAllProjects);

// Get project by ID (Protected route)
router.get('/:id', authenticate, projectController.getProjectById);

// Update project by ID (Protected route)
router.put('/:id', authenticate, upload.single('projectImage'), projectController.updateProjectById);

// Delete project by ID (Protected route)
router.delete('/:id', authenticate, projectController.deleteProjectById);

module.exports = router;
