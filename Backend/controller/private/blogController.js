const Blog = require('../../models/Blog'); // Adjust the path to your Blog model
const upload = require('../../middleware/upload'); // Adjust the path to your multer config

// Create a new blog
const createBlog = async (req, res) => {
    try {
        const { title, meta_description, keywords, slug, canonical_url, author, publish_date, content, tags, image_alt_text, focus_keyword, category, excerpt } = req.body;
        const image = req.file ? req.file.filename : null; // Get the uploaded image filename

        const newBlog = await Blog.create({
            title,
            meta_description,
            keywords,
            slug,
            canonical_url,
            author,
            publish_date,
            content,
            tags,
            image,
            image_alt_text,
            focus_keyword,
            category,
            excerpt
        });

        return res.status(201).json({ message: 'Blog created successfully!', blog: newBlog });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
};

// Update blog by ID
const updateBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const { title, meta_description, keywords, slug, canonical_url, author, publish_date, content, tags, image_alt_text, focus_keyword, category, excerpt } = req.body;
        const image = req.file ? req.file.filename : blog.image; // Use uploaded image if provided, otherwise keep the existing one

        await blog.update({
            title,
            meta_description,
            keywords,
            slug,
            canonical_url,
            author,
            publish_date,
            content,
            tags,
            image,
            image_alt_text,
            focus_keyword,
            category,
            excerpt
        });

        return res.status(200).json({ message: 'Blog updated successfully!', blog });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating blog', error: error.message });
    }
};

// Get blog by ID
const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving blog', error: error.message });
    }
};

// Delete blog by ID
const deleteBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await Blog.destroy({ where: { id } });
        if (!deletedCount) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(200).json({ message: 'Blog deleted successfully!' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting blog', error: error.message });
    }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving blogs', error: error.message });
    }
};

// Export controller functions
module.exports = {
    createBlog,
    updateBlogById,
    getBlogById,
    deleteBlogById,
    getAllBlogs,
};
