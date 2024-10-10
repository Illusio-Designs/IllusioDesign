// controllers/Private/projectController.js
const Project = require('../../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
    const { title, year, industry, services, timeline, content, mainImage, secondImage, assetLink } = req.body;

    try {
        // Validate required fields
        if (!title || !year || !industry || !services || !timeline || !content || !mainImage) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        // Create the project
        const newProject = await Project.create({
            title,
            year,
            industry,
            services,
            timeline,
            content,
            mainImage,
            secondImage,
            assetLink,
        });

        console.log(`Project created successfully: ${newProject.title} (${newProject.year})`);
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an existing project by ID
exports.updateProject = async (req, res) => {
    const { id } = req.params; // Project ID from URL parameters
    const { title, year, industry, services, timeline, content, mainImage, secondImage, assetLink } = req.body;

    try {
        // Find the project by ID
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        // Update the project with new data
        await project.update({
            title: title || project.title,
            year: year || project.year,
            industry: industry || project.industry,
            services: services || project.services,
            timeline: timeline || project.timeline,
            content: content || project.content,
            mainImage: mainImage || project.mainImage,
            secondImage: secondImage || project.secondImage,
            assetLink: assetLink || project.assetLink,
        });

        console.log(`Project updated successfully: ${project.title} (${project.year})`);
        res.status(200).json(project);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
    const { id } = req.params; // Project ID from URL parameters

    try {
        // Find the project by ID
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        // Delete the project
        await project.destroy();

        console.log(`Project deleted successfully: ${project.title} (${project.year})`);
        res.status(200).json({ message: 'Project deleted successfully.' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
