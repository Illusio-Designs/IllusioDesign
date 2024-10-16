const PagePath = require('../../models/pagePath');

// Controller for handling page paths
exports.savePagePath = async (req, res) => {
  try {
    const { path } = req.body;
    console.log('Attempting to save path:', path); // Log the incoming path

    // Check if the path is defined
    if (!path) {
      return res.status(400).json({ message: 'Path is required' });
    }

    // Check if the path already exists in the database
    const existingPath = await PagePath.findOne({ where: { path } });
    if (existingPath) {
      return res.status(400).json({ message: 'Page path already exists' });
    }

    // Create a new page path entry in the database
    const newPath = await PagePath.create({ path });
    res.status(201).json(newPath); // Return the newly created path
  } catch (error) {
    console.error('Error saving page path:', error);
    res.status(500).json({ message: 'Error saving page path', error });
  }
};

exports.getPagePaths = async (req, res) => {
  try {
    // Fetch all page paths from the database
    const paths = await PagePath.findAll();
    res.status(200).json(paths); // Return the fetched paths
  } catch (error) {
    console.error('Error fetching page paths:', error);
    res.status(500).json({ message: 'Error fetching page paths', error });
  }
};
