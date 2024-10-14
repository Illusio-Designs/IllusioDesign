// controllers/projectController.js
const Project = require('../../models/Project');

// Public Controller
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProjectByTitle = async (req, res) => {
    const { title } = req.params;

    try {
        const project = await Project.findOne({
            where: { title },
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project by title:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};