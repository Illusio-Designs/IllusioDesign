const Blog = require('../../models/Blog');
const SEO = require('../../models/SEO');

exports.uploadImage = (req, res) => {
    if (req.file) {
        res.json({ url: `/uploads/blogs/${req.file.filename}` });
    } else {
        res.status(400).json({ error: 'Image upload failed' });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const { title, content, publishedDate, metaDescription, seoTitle, url } = req.body;
        const image = req.file ? req.file.filename : null;

        // Create or find existing SEO record
        const [seo, created] = await SEO.findOrCreate({
            where: { url }, // Ensure URL is unique
            defaults: {
                metaDescription,
                title: seoTitle,
            },
        });

        // Create Blog with the associated seoId
        const newBlog = await Blog.create({
            title,
            content,
            publishedDate: new Date(publishedDate),
            image,
            seoId: seo.id,
        });

        return res.status(201).json(newBlog);
    } catch (error) {
        console.error('Error creating blog:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, publishedDate, metaDescription, seoTitle, url } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Update blog fields
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.publishedDate = publishedDate || blog.publishedDate;
        blog.image = image || blog.image;

        // Update or create the associated SEO record
        const [seo, created] = await SEO.findOrCreate({
            where: { url }, // Ensure URL is unique
            defaults: {
                metaDescription,
                title: seoTitle,
            },
        });

        // If SEO record already exists, update it
        if (!created) {
            seo.metaDescription = metaDescription || seo.metaDescription;
            seo.title = seoTitle || seo.title;
            await seo.save();
        }

        // Link the blog to the SEO record
        blog.seoId = seo.id;

        await blog.save();

        res.status(200).json(blog);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findByPk(id, { include: { model: SEO, as: 'seo' } });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.seo) {
            await blog.seo.destroy();
        }

        await blog.destroy();

        res.status(200).json({ message: 'Blog and associated SEO data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({ include: { model: SEO, as: 'seo' } });
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
