const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Seo extends Model {
  static associate(models) {
    // Define associations here if needed
  }
}

Seo.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  page_url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  page_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meta_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  focus_keyword: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  canonical_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image_alt_tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_updated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Seo',
  tableName: 'seo',
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Sync model to create or update table
sequelize.sync()
  .then(() => {
    console.log("SEO table has been created or updated!");
  })
  .catch((error) => {
    console.error("Error syncing the SEO model:", error);
  });

module.exports = Seo;
