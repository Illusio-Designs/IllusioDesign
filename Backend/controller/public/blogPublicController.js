// controllers/blogController.js

const { Blog } = require('../../models'); // Adjust the path to your models

// Function to get all blogs
const getAllPublicBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll(); // Fetch all blogs
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
    }
};

// Function to get a blog by title
const getPublicBlogByTitle = async (req, res) => {
    const { title } = req.params; // Get title from request parameters
    try {
        const blog = await Blog.findOne({ where: { title } }); // Find the blog by title
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog by title:', error);
        res.status(500).json({ message: 'Failed to fetch blog by title', error: error.message });
    }
};

// Export the controller functions
module.exports = {
    getAllPublicBlogs,
    getPublicBlogByTitle,
};
