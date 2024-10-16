const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');
const sequelize = require('../config/database'); // Adjust this path as needed

class PagePath extends Model {}

PagePath.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Ensures each path is unique
  }
}, {
  sequelize,
  modelName: 'PagePath',
  timestamps: true, // Adds createdAt and updatedAt columns
});

module.exports = PagePath;
