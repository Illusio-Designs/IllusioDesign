// controllers/blogController.js
const { Blog } = require('../../models'); // Assuming Blog is the model name

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    // Handle file upload
    if (req.file) {
      req.body.image = req.file.filename;
    }

    const newBlog = await Blog.create(req.body);
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
};

// Update blog by ID
exports.updateBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Handle file upload if present
    if (req.file) {
      req.body.image = req.file.filename;
    }

    await blog.update(req.body);
    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
};

// Delete blog by ID
exports.deleteBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.destroy();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};
