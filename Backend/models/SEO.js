const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class SEO extends Model {
  static associate(models) {
    SEO.hasMany(models.Blog, { foreignKey: 'seoId', as: 'blogs' });
  }
}

SEO.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'SEO',
    tableName: 'seos',
    timestamps: true,
  }
);

module.exports = SEO;