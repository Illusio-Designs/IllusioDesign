import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const SEO = sequelize.define('SEO', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  page: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  keywords: {
    type: DataTypes.TEXT
  },
  ogImage: {
    type: DataTypes.STRING
  },
  ogTitle: {
    type: DataTypes.STRING
  },
  ogDescription: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'seo',
  timestamps: true
});

export default SEO;
