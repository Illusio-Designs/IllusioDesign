// models/Blog.js
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    publish_date: DataTypes.DATE,
    content: DataTypes.TEXT,
    tags: DataTypes.STRING,
  });

  Blog.associate = (models) => {
    Blog.belongsTo(models.SEO, {
      foreignKey: 'seoId',
      as: 'seo', // Alias for the relationship
    });
  };

  return Blog;
};
