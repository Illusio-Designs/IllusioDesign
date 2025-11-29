import { Blog } from '../../models/Blog.js';

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json({ data: blogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json({ data: blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, slug, date, content, published } = req.body;
    
    const image = req.file ? `/uploads/images/${req.file.filename}` : req.body.image;
    
    if (!title || !slug) {
      return res.status(400).json({ error: 'Title and slug are required' });
    }
    
    // Check if slug already exists
    const existingBlog = await Blog.findBySlug(slug);
    if (existingBlog) {
      return res.status(400).json({ error: 'Blog with this slug already exists' });
    }
    
    const blog = await Blog.create({
      title,
      slug,
      date: date || new Date().toISOString().split('T')[0],
      content: content || '',
      image: image || null,
      published: published !== undefined ? published : true
    });
    
    res.status(201).json({ data: blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (req.file) {
      updates.image = `/uploads/images/${req.file.filename}`;
    }
    
    // Check slug uniqueness if slug is being updated
    if (updates.slug) {
      const existingBlog = await Blog.findBySlug(updates.slug);
      if (existingBlog && existingBlog.id !== parseInt(id)) {
        return res.status(400).json({ error: 'Blog with this slug already exists' });
      }
    }
    
    const blog = await Blog.updateById(id, updates);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json({ data: blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.deleteById(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

