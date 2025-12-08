import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const PrivacyPolicy = sequelize.define('PrivacyPolicy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT('long'), // Use TEXT with explicit length for better emoji support
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    allowNull: false
  },
  lastUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'privacy_policy',
  timestamps: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

export default PrivacyPolicy;

