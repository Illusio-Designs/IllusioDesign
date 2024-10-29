// models/blog.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Blog extends Model {
  static associate(models) {
    // Define associations here if needed
  }
}

Blog.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meta_description: {
    type: DataTypes.TEXT,
  },
  keywords: {
    type: DataTypes.STRING,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  canonical_url: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
  tags: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  image_alt_text: {
    type: DataTypes.STRING,
  },
  focus_keyword: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Blog',
  tableName: 'blogs',
});

// Sync model to create or update table
sequelize.sync()
  .then(() => {
    console.log("Blog table has been created or updated!");
  })
  .catch((error) => {
    console.error("Error syncing the Blog model:", error);
  });

module.exports = Blog;
