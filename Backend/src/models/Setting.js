import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/**
 * Platform settings — key/value store for site-wide configuration such as
 * analytics IDs (GA, Facebook Pixel), contact details and social links.
 * `isPublic` controls whether a key is exposed on the public settings endpoint.
 */
const Setting = sequelize.define('Setting', {
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
  value: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'general'
  },
  label: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'settings',
  timestamps: true
});

export default Setting;
