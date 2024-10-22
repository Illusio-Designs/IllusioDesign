// Backend/controller/public/projectPublicController.js
const { Project } = require('../../models'); // Adjust the path as necessary

// Get all projects
exports.getAllPublicProjects = async (req, res) => {
    try {
        const projects = await Project.findAll(); // Fetch all projects without filtering
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
};

// Get a project by title
exports.getProjectByTitle = async (req, res) => {
    const { title } = req.params; // Get the title from the request parameters
    try {
        const project = await Project.findOne({
            where: {
                title: title // Find project by title
            }
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project by title:', error);
        res.status(500).json({ message: 'Error fetching project by title', error: error.message });
    }
};
