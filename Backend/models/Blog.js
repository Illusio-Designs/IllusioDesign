const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');
const sequelize = require('../config/database');

class Blog extends Model {
  static associate(models) {
    Blog.belongsTo(models.SEO, { foreignKey: 'seoId', as: 'seo' });
  }
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publishedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    metaDescription: {
      type: DataTypes.STRING, // Add this field
      allowNull: true,
    },
    seoTitle: {
      type: DataTypes.STRING, // Add this field
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING, // Add this field
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
    timestamps: true,
  }
);

module.exports = Blog;
