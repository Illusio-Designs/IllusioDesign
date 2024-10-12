// controllers/Private/projectController.js

const Project = require('../../models/Project'); // Ensure the path is correct
const multer = require('multer');
const path = require('path');

// Set up Multer storage for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/projects'); // Define the upload folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage: storage });

// Upload Image Endpoint
const uploadImage = (req, res) => {
  if (req.file) {
    res.json({ url: `http://localhost:5000/uploads/projects/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'Image upload failed' });
  }
};

// Create a new project
const createProject = async (req, res) => {
  const { title, year, industry, services, timeline, content, mainImage, assetLink } = req.body;

  try {
    if (!title || !year || !industry || !services || !timeline || !content || !mainImage) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const project = await Project.create({
      title,
      year,
      industry,
      services,
      timeline,
      content,
      mainImage,
      assetLink,
    });

    console.log(`Project created successfully: ${project.title} (${project.year})`);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing project by ID
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, year, industry, services, timeline, content, mainImage, assetLink } = req.body;

  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    await project.update({
      title: title || project.title,
      year: year || project.year,
      industry: industry || project.industry,
      services: services || project.services,
      timeline: timeline || project.timeline,
      content: content || project.content,
      mainImage: mainImage || project.mainImage,
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
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    await project.destroy();
    console.log(`Project deleted successfully: ${project.title} (${project.year})`);
    res.status(200).json({ message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export controller functions
module.exports = {
  upload: upload.single('image'),
  uploadImage,
  createProject,
  updateProject,
  deleteProject,
};
