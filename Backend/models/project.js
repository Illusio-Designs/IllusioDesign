// models/project.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Project extends Model {
  static associate(models) {
    // Define associations here if needed
  }
}

Project.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timeline: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  services: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // SEO fields
  meta_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  meta_keywords: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  canonical_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  focus_keyword: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image_alt_text: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Project',
  tableName: 'projects',
});

// Sync model to create or update table
sequelize.sync()
  .then(() => {
    console.log("Project table has been created or updated!");
  })
  .catch((error) => {
    console.error("Error syncing the Project model:", error);
  });

module.exports = Project;
