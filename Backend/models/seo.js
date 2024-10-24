const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

module.exports = (sequelize) => {
  class SEO extends Model {
    static associate(models) {
      // Define association with Project
      SEO.hasMany(models.Project, {
        foreignKey: 'seoId', // This should match the field in the Project model
        as: 'projects' // Alias for the association
      });

      // Define association with Blog
      SEO.hasOne(models.Blog, {
        foreignKey: 'seoId', // This should match the field in the Blog model
        as: 'blog' // Alias for the association
      });
    }
  }

  SEO.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'SEO',
  });

  return SEO;
};
