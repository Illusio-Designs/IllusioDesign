const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Seo = require('./seoModel');

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publishDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  image: {
    type: DataTypes.STRING,
  },
});

// Blog belongs to Seo
Blog.belongsTo(Seo);

module.exports = Blog;
