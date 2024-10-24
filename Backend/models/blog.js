module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null if tags are optional
    },
    image: {
      type: DataTypes.STRING, // Store the image filename or path
      allowNull: true, // Allow null if the image is optional
    },
  });

  Blog.associate = (models) => {
    Blog.belongsTo(models.SEO, {
      foreignKey: 'seoId',
      as: 'seo', // Alias for the relationship
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Behavior when the SEO record is deleted
    });
  };

  return Blog;
};
