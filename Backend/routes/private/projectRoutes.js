// routes/private/projectRoutes.js

const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/Private/projectController'); // Ensure this path is correct
const { authenticate } = require('../../middleware/auth'); // Import your authentication middleware

// Debugging: Check if projectController is loaded correctly
console.log('Project Controller:', projectController);

// Create a new project (POST /api/projects)
router.post('/', authenticate, projectController.createProject);

// Update an existing project by ID (PUT /api/projects/:id)
router.put('/:id', authenticate, projectController.updateProject);

// Delete a project by ID (DELETE /api/projects/:id)
router.delete('/:id', authenticate, projectController.deleteProject);

// Upload Image Endpoint (POST /api/projects/uploads)
router.post('/uploads', authenticate, projectController.upload, projectController.uploadImage);

module.exports = router; // Export the private routes
