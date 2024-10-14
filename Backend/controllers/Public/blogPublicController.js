const { Op } = require('sequelize');
const Blog = require('../../models/Blog');
const SEO = require('../../models/SEO');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { publishedDate: { [Op.lte]: new Date() } },
      include: [{ model: SEO, as: 'seo' }],
      order: [['publishedDate', 'DESC']],
    });
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// exports.getBlogById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const blog = await Blog.findByPk(id, { include: { model: SEO, as: 'seo' } });
//     if (!blog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }
//     res.status(200).json(blog);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// exports.getBlogByURL = async (req, res) => {
//   const { url } = req.params;

//   try {
//     const seo = await SEO.findOne({
//       where: { url },
//       include: { model: Blog, as: 'blog' },
//     });
//     if (!seo || !seo.blog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }

//     res.status(200).json(seo.blog);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

exports.getBlogByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const blog = await Blog.findOne({
      where: { title },
      include: [{ model: SEO, as: 'seo' }],
    });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};