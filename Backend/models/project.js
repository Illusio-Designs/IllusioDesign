const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // Define association with SEO
      Project.belongsTo(models.SEO, {
        foreignKey: 'seoId', // This should match the field in the Project model
        as: 'seo' // Alias for the association
      });
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
    tableName: 'projects', // Specify the exact table name if different
  });

  return Project;
};
