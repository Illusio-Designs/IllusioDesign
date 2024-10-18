const Blog = require('../../models/blogModel');
const Seo = require('../../models/seoModel');

exports.createBlog = async (req, res) => {
  try {
    const { title, tags, category, content, author } = req.body;
    const image = req.file ? req.file.filename : null; // Get the filename from multer
    const blog = await Blog.create({ title, tags, category, content, author, image });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add more blog-related methods as needed
