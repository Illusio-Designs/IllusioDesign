const Project = require('../../models/project'); // Adjust path if necessary
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Create SEO and Project
exports.createProject = async (req, res) => {
  try {
    const { title, content, year, timeline, services, industry, website, seoTitle, seoDescription, seoUrl } = req.body;
    const image = req.file ? req.file.filename : null; // Get the uploaded image path

    // Create a new SEO entry
    const newSEO = await SEO.create({
      title: seoTitle,
      description: seoDescription,
      url: seoUrl
    });

    // Create a new project with the associated SEO ID
    const newProject = await Project.create({
      title,
      content,
      year,
      timeline,
      services,
      industry,
      website,
      image, // Save the image path to the database
      seoId: newSEO.id // Associate the new SEO ID
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Get all projects with associated SEO data
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [{
        model: SEO,
        as: 'seo', // Use the alias defined in the association
        attributes: ['id', 'title', 'description'] // Specify the fields you want to include
      }]
    });

    res.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findByPk(projectId, { include: [SEO] }); // Include SEO data
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};

// Update project by ID
exports.updateProjectById = async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete the old image if a new one is uploaded
    if (req.file) {
      const oldImagePath = path.join(__dirname, '../../uploads', project.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image
      }
      project.image = req.file.filename; // Update with new image
    }

    const { title, content, year, timeline, services, industry, website } = req.body;
    project.title = title;
    project.content = content;
    project.year = year;
    project.timeline = timeline;
    project.services = services;
    project.industry = industry;
    project.website = website;

    await project.save();
    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
};
// Delete project by ID
exports.deleteProjectById = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete project image if it exists
    if (project.image) {
      const imagePath = path.join(__dirname, '../../uploads', project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image
      }
    }

    await project.destroy(); // Delete project from the database
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
};
