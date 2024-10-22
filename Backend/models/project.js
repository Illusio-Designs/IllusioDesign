const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

class Project extends Model {}

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
    type: DataTypes.STRING, // Comma-separated
    allowNull: true,
  },
  industry: {
    type: DataTypes.STRING, // Comma-separated
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
  seoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'SEOs',
      key: 'id',
    },
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Project',
});

// Export the model
module.exports = Project;
