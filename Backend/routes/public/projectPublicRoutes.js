// Backend/routes/public/projectPublicRoutes.js
const express = require('express');
const router = express.Router();
const projectPublicController = require('../../controller/public/projectPublicController');

// Route to get all projects
router.get('/', projectPublicController.getAllPublicProjects);

// Route to get a project by title
router.get('/:title', projectPublicController.getProjectByTitle);

module.exports = router;
