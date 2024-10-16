const PagePath = require('../../models/pagePath'); // Adjust the path if necessary

// Fetch all page paths
exports.getPagePaths = async (req, res) => {
  try {
    const paths = await PagePath.findAll(); // Fetch all records from PagePath
    res.status(200).json(paths); // Return the fetched paths as JSON
  } catch (error) {
    console.error('Error fetching page paths:', error);
    res.status(500).json({ message: 'Error fetching page paths', error });
  }
};

// Fetch a specific page path by ID
exports.getPagePathById = async (req, res) => {
  const { id } = req.params;

  try {
    const path = await PagePath.findByPk(id); // Fetch path by primary key
    if (!path) {
      return res.status(404).json({ message: 'Page path not found' });
    }
    res.status(200).json(path); // Return the fetched path
  } catch (error) {
    console.error('Error fetching page path:', error);
    res.status(500).json({ message: 'Error fetching page path', error });
  }
};

// Delete a specific page path by ID
exports.deletePagePath = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await PagePath.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Page path not found' });
    }

    res.status(204).json(); // Respond with no content on successful deletion
  } catch (error) {
    console.error('Error deleting page path:', error);
    res.status(500).json({ message: 'Error deleting page path', error });
  }
};
