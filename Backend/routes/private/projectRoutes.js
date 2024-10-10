// routes/private/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/Private/projectController');
const { authenticate } = require('../../middleware/auth'); // Import your authentication middleware

// Create a new project (POST /api/projects)
router.post('/', authenticate, projectController.createProject);

// Update an existing project by ID (PUT /api/projects/:id)
router.put('/:id', authenticate, projectController.updateProject);

// Delete a project by ID (DELETE /api/projects/:id)
router.delete('/:id', authenticate, projectController.deleteProject);

module.exports = router; // Export the private routes
