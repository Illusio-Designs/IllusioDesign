const { Blog, SEO } = require('../../models'); // Adjust the path as necessary

const createBlog = async (req, res) => {
  try {
    const { title, category, publish_date, content, tags, author } = req.body;

    // Check if seo is a string, parse it if it is, otherwise use it as is
    const seo = req.body.seo ? (typeof req.body.seo === 'string' ? JSON.parse(req.body.seo) : req.body.seo) : null;
    
    const imageFileName = req.file ? req.file.filename : null;

    // Validate required fields
    if (!title || !category || !publish_date || !content || !author || !seo) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Create SEO entry
    const seoEntry = await SEO.create({
      title: seo.title,
      description: seo.description,
      url: seo.url,
    });

    // Create blog with SEO reference
    const newBlog = await Blog.create({
      title,
      category,
      publish_date,
      content,
      tags: tags || '',
      image: imageFileName,
      seoId: seoEntry.id,
      author,
    });

    // Fetch the created blog with SEO data
    const blogWithSeo = await Blog.findByPk(newBlog.id, {
      include: [{ model: SEO, as: 'seo' }],
    });

    res.status(201).json({ 
      message: 'Blog created successfully', 
      blog: blogWithSeo,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ 
      message: 'Error creating blog', 
      error: error.message,
    });
  }
};


// Update a blog by ID
const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, publish_date, content, tags, seo, author } = req.body;
    const imageFileName = req.file ? req.file.filename : null;

    const blog = await Blog.findByPk(id); 
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Update fields
    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.publish_date = publish_date || blog.publish_date;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.image = imageFileName || blog.image; // Only update if a new image is provided
    blog.author = author || blog.author; // Update author field if provided

    if (seo) {
      let seoEntry = await SEO.findOne({ where: { id: blog.seoId } });
      if (seoEntry) {
        await seoEntry.update(seo); // Update existing SEO entry
      } else {
        seoEntry = await SEO.create(seo); // Create new SEO if it doesn't exist
        blog.seoId = seoEntry.id; // Link to new SEO entry
      }
    }

    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
};

// Get a blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id, {
      include: [{ model: SEO, as: 'seo' }], // Include SEO details
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
};

// Delete a blog by ID
// Delete a blog by ID
const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id, { include: [{ model: SEO, as: 'seo' }] }); // Include the SEO model

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Delete associated SEO data if it exists
    if (blog.seoId) {
      await SEO.destroy({ where: { id: blog.seoId } });
    }

    await blog.destroy();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
};


// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: SEO, as: 'seo' }], // Include SEO details
    });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};

// Export the controller methods
module.exports = {
  createBlog,
  updateBlogById,
  getBlogById,
  deleteBlogById,
  getAllBlogs,
};
