const Project = require('../../models/projectModel');
const Seo = require('../../models/seoModel');

exports.createProject = async (req, res) => {
  try {
    const { title, year, industry, services, timeline, content, url } = req.body;
    const image = req.file ? req.file.filename : null; // Get the filename from multer
    const project = await Project.create({ title, year, industry, services, timeline, content, image, url });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add more project-related methods as needed
