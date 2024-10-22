const { Project, SEO } = require('../../models'); // Adjust path if necessary
const multer = require('multer');

// Create SEO and Project
exports.createProject = async (req, res) => {
  try {
    const { title, content, year, timeline, services, industry, website } = req.body;
    
    // Create SEO entry
    const seoData = { title, description: content, url: website }; // Adjust description as needed
    const seo = await SEO.create(seoData);

    // Create Project entry
    const projectData = {
      title,
      content,
      year,
      timeline,
      services,
      industry,
      website,
      image: req.file ? req.file.filename : null, // Handle image upload
      seoId: seo.id // Assuming there's a foreign key in the Project model
    };
    
    const project = await Project.create(projectData);
    
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({ include: [SEO] }); // Include SEO data
    res.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
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

    // Update project fields
    const { title, content, year, timeline, services, industry, website } = req.body;
    project.title = title;
    project.content = content;
    project.year = year;
    project.timeline = timeline;
    project.services = services;
    project.industry = industry;
    project.website = website;
    if (req.file) project.image = req.file.filename; // Handle image upload

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
    const result = await Project.destroy({ where: { id: projectId } });
    if (!result) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
};
    