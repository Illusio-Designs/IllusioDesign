// models/Project.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path based on your structure

class Project extends Model {}

Project.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    services: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mainImage: {
      type: DataTypes.STRING, // URL of the main image
      allowNull: false,
    },
    assetLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Projects',
  }
);

module.exports = Project;
