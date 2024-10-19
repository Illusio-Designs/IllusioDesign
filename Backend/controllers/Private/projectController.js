const Project = require('../../models/projectModel');
const Seo = require('../../models/seoModel');

// Fetch all projects
exports.getAllProjects = async (req, res) => {
    console.log('Authenticated user:', req.user); // Log user for debugging
    if (!req.user || !req.user.isAdmin) {
        console.log('Access denied. User is not admin:', req.user);
        return res.status(403).json({ error: 'Forbidden' });
    }
    try {
        const projects = await Project.findAll();
        console.log('Fetched projects:', projects);
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: error.message });
    }
};

// Create a project
exports.createProject = async (req, res) => {
    try {
        const { title, year, industry, services, timeline, content, url, seoTitle, seoDescription, seoUrl } = req.body;
        const image = req.file ? req.file.filename : null;

        const project = await Project.create({
            title,
            year,
            industry,
            services,
            timeline,
            content,
            image,
            url,
            seoTitle,
            seoDescription,
            seoUrl,
        });

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update project by ID
exports.updateProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, year, industry, services, timeline, content, url } = req.body;
        const image = req.file ? req.file.filename : null;

        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.title = title || project.title;
        project.year = year || project.year;
        project.industry = industry || project.industry;
        project.services = services || project.services;
        project.timeline = timeline || project.timeline;
        project.content = content || project.content;
        project.url = url || project.url;

        if (image) {
            project.image = image;
        }

        await project.save();
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Delete project by ID
exports.deleteProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.destroy();
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
