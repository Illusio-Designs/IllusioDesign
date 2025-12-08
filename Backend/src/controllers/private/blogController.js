import Blog from '../../models/Blog.js';
import SEO from '../../models/SEO.js';

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

// Helper function to create SEO page name from blog ID
const createSEOPageName = (blogId) => {
  if (!blogId) return null;
  return `blog-${blogId}`;
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
    // Ensure UTF-8 encoding for response
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
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
      seoKeywords,
      seoUrl,
      published 
    } = req.body;
    
    // Ensure content is properly decoded as UTF-8 string
    const decodedContent = content ? String(content) : '';
    
    const image = req.file ? (req.file.webpPath || `/uploads/images/blog/${req.file.filename}`) : req.body.image;
    
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
      content: decodedContent, // Use decoded content to preserve emojis
      image: image || null,
      author: author || null,
      publishDate: publishDate || date || new Date().toISOString().split('T')[0],
      seoTitle: seoTitle || null,
      metaDescription: metaDescription || null,
      seoKeywords: seoKeywords || null,
      seoUrl: seoUrl || blogSlug,
      published: published !== undefined ? (published === 'true' || published === true) : true
    });
    
    // Create SEO entry automatically
    if (blog.id && (seoTitle || metaDescription)) {
      try {
        const seoPageName = createSEOPageName(blog.id);
        if (seoPageName) {
          // Check if SEO entry already exists
          const existingSEO = await SEO.findOne({ where: { page: seoPageName } });
          
          if (existingSEO) {
            // Update existing SEO entry
            await existingSEO.update({
              title: seoTitle || title,
              description: metaDescription || content ? content.substring(0, 160) : null,
              ogTitle: seoTitle || title,
              ogDescription: metaDescription || content ? content.substring(0, 160) : null,
              ogImage: image || null
            });
          } else {
            // Create new SEO entry
            await SEO.create({
              page: seoPageName,
              title: seoTitle || title,
              description: metaDescription || content ? content.substring(0, 160) : null,
              ogTitle: seoTitle || title,
              ogDescription: metaDescription || content ? content.substring(0, 160) : null,
              ogImage: image || null
            });
          }
        }
      } catch (seoError) {
        // Log error but don't fail the blog creation
        console.error('Error creating SEO entry:', seoError);
      }
    }
    
    res.status(201).json({ data: blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    // Ensure UTF-8 encoding for response
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const { id } = req.params;
    const updates = { ...req.body };
    
    // Ensure content is properly decoded as UTF-8 string if present
    if (updates.content !== undefined) {
      updates.content = String(updates.content);
    }
    
    // Handle seoKeywords if present
    if (updates.seoKeywords !== undefined) {
      updates.seoKeywords = String(updates.seoKeywords);
    }
    
    if (req.file) {
      updates.image = req.file.webpPath || `/uploads/images/blog/${req.file.filename}`;
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
    
    // Store old ID before update (ID shouldn't change, but just in case)
    const blogId = blog.id;
    const oldSeoPageName = createSEOPageName(blogId);
    
    await blog.update(updates);
    
    // Refresh blog to get updated data
    await blog.reload();
    
    // Update SEO entry automatically
    const finalSeoTitle = updates.seoTitle !== undefined ? updates.seoTitle : blog.seoTitle;
    const finalMetaDescription = updates.metaDescription !== undefined ? updates.metaDescription : blog.metaDescription;
    const finalImage = updates.image !== undefined ? updates.image : blog.image;
    const finalTitle = updates.title || blog.title;
    const finalContent = updates.content || blog.content;
    
    if (blog.id && (finalSeoTitle || finalMetaDescription)) {
      try {
        const newSeoPageName = createSEOPageName(blog.id);
        if (newSeoPageName) {
          // If blog ID changed (shouldn't happen, but handle it)
          if (oldSeoPageName && oldSeoPageName !== newSeoPageName) {
            const oldSEO = await SEO.findOne({ where: { page: oldSeoPageName } });
            if (oldSEO) {
              await oldSEO.destroy();
            }
          }
          
          // Check if SEO entry already exists
          const existingSEO = await SEO.findOne({ where: { page: newSeoPageName } });
          
          if (existingSEO) {
            // Update existing SEO entry
            await existingSEO.update({
              title: finalSeoTitle || finalTitle,
              description: finalMetaDescription || (finalContent ? finalContent.substring(0, 160) : null),
              ogTitle: finalSeoTitle || finalTitle,
              ogDescription: finalMetaDescription || (finalContent ? finalContent.substring(0, 160) : null),
              ogImage: finalImage || null
            });
          } else {
            // Create new SEO entry
            await SEO.create({
              page: newSeoPageName,
              title: finalSeoTitle || finalTitle,
              description: finalMetaDescription || (finalContent ? finalContent.substring(0, 160) : null),
              ogTitle: finalSeoTitle || finalTitle,
              ogDescription: finalMetaDescription || (finalContent ? finalContent.substring(0, 160) : null),
              ogImage: finalImage || null
            });
          }
        }
      } catch (seoError) {
        // Log error but don't fail the blog update
        console.error('Error updating SEO entry:', seoError);
      }
    }
    
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
    
    // Delete associated SEO entry
    if (blog.id) {
      try {
        const seoPageName = createSEOPageName(blog.id);
        if (seoPageName) {
          const seoEntry = await SEO.findOne({ where: { page: seoPageName } });
          if (seoEntry) {
            await seoEntry.destroy();
          }
        }
      } catch (seoError) {
        // Log error but don't fail the blog deletion
        console.error('Error deleting SEO entry:', seoError);
      }
    }
    
    await blog.destroy();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

