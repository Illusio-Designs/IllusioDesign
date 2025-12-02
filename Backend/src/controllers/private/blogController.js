import Blog from '../../models/Blog.js';

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json({ data: blogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    
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
    const { 
      title, 
      slug, 
      date, 
      category,
      tags,
      content, 
      author,
      publishDate,
      seoTitle,
      metaDescription,
      seoUrl,
      published 
    } = req.body;
    
    const image = req.file ? `/uploads/images/${req.file.filename}` : req.body.image;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    // Generate slug from title if not provided
    const blogSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Check if slug already exists
    const existingBlog = await Blog.findOne({ where: { slug: blogSlug } });
    if (existingBlog) {
      return res.status(400).json({ error: 'Blog with this slug already exists' });
    }
    
    // Handle tags - convert string to array
    let tagsArray = [];
    if (tags) {
      tagsArray = typeof tags === 'string' ? tags.split(',').map(t => t.trim()).filter(t => t) : tags;
    }
    
    const blog = await Blog.create({
      title,
      slug: blogSlug,
      date: date || new Date().toISOString().split('T')[0],
      category: category || null,
      tags: tagsArray,
      content: content || '',
      image: image || null,
      author: author || null,
      publishDate: publishDate || date || new Date().toISOString().split('T')[0],
      seoTitle: seoTitle || null,
      metaDescription: metaDescription || null,
      seoUrl: seoUrl || blogSlug,
      published: published !== undefined ? (published === 'true' || published === true) : true
    });
    
    res.status(201).json({ data: blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    
    if (req.file) {
      updates.image = `/uploads/images/${req.file.filename}`;
    }
    
    // Handle tags - convert string to array
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map(t => t.trim()).filter(t => t);
    }
    
    // Handle boolean fields
    if (updates.published !== undefined) {
      updates.published = updates.published === 'true' || updates.published === true;
    }
    
    // Check slug uniqueness if slug is being updated
    if (updates.slug) {
      const existingBlog = await Blog.findOne({ where: { slug: updates.slug } });
      if (existingBlog && existingBlog.id !== parseInt(id)) {
        return res.status(400).json({ error: 'Blog with this slug already exists' });
      }
    }
    
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    await blog.update(updates);
    res.json({ data: blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    await blog.destroy();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

