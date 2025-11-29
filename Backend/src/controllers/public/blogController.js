import { Blog } from '../../models/Blog.js';

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findPublished();
    res.json({ data: blogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findBySlug(req.params.slug);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json({ data: blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog || blog.published === false) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json({ data: blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

