const Project = require('../../models/project'); // Adjust path if necessary
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Create Project
exports.createProject = async (req, res) => {
  try {
    const { title, content, year, timeline, services, industry, website, meta_description, meta_keywords, slug, canonical_url, focus_keyword, image_alt_text } = req.body;
    const image = req.file ? req.file.filename : null; // Get the uploaded image path

    // Create a new project with the associated SEO data
    const newProject = await Project.create({
      title,
      content,
      year,
      timeline,
      services,
      industry,
      website,
      image, // Save the image path to the database
      meta_description,
      meta_keywords,
      slug,
      canonical_url,
      focus_keyword,
      image_alt_text
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll(); // No need to include SEO since it's integrated into Project now
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
    const project = await Project.findByPk(projectId);
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
      const oldImagePath = path.join(__dirname, '../../uploads/project', project.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image
      }
      project.image = req.file.filename; // Update with new image
    }

    const { title, content, year, timeline, services, industry, website, meta_description, meta_keywords, slug, canonical_url, focus_keyword, image_alt_text } = req.body;

    // Update project fields
    Object.assign(project, {
      title,
      content,
      year,
      timeline,
      services,
      industry,
      website,
      meta_description,
      meta_keywords,
      slug,
      canonical_url,
      focus_keyword,
      image_alt_text,
    });

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
      const imagePath = path.join(__dirname, '../../uploads/project', project.image);
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
