const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Seo = require('./seoModel');

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
  },
  industry: {
    type: DataTypes.STRING,
  },
  services: {
    type: DataTypes.STRING,
  },
  timeline: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Project belongs to Seo
Project.belongsTo(Seo);

module.exports = Project;
