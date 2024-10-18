const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Seo = sequelize.define('Seo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Seo;
