import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/**
 * Generic content store for inbound / SEO content management — editable
 * content blocks keyed by a unique slug, each with its own SEO metadata.
 */
const Content = sequelize.define('Content', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  body: {
    type: DataTypes.TEXT('long'),
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'section'
  },
  metaTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  metaDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  metaKeywords: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'published'
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'contents',
  timestamps: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

export default Content;
