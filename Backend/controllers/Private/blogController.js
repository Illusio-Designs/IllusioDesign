const Blog = require('../../models/Blog');
const SEO = require('../../models/SEO');

exports.createBlog = async (req, res) => {
  const { title, content, publishedDate, image, metaDescription, seoTitle, url } = req.body;

  try {
    const seo = await SEO.create({
      metaDescription,
      title: seoTitle,
      url,
    });

    const blog = await Blog.create({
      title,
      content,
      publishedDate,
      image,
      seoId: seo.id,
    });

    const blogWithSeo = await Blog.findByPk(blog.id, { include: { model: SEO, as: 'seo' } });

    res.status(201).json(blogWithSeo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, publishedDate, image, metaDescription, seoTitle, url } = req.body;

  try {
    const blog = await Blog.findByPk(id, { include: { model: SEO, as: 'seo' } });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.update({
      title: title || blog.title,
      content: content || blog.content,
      publishedDate: publishedDate || blog.publishedDate,
      image: image || blog.image,
    });

    if (blog.seo) {
      await blog.seo.update({
        metaDescription: metaDescription || blog.seo.metaDescription,
        title: seoTitle || blog.seo.title,
        url: url || blog.seo.url,
      });
    }

    const updatedBlog = await Blog.findByPk(id, { include: { model: SEO, as: 'seo' } });
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
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