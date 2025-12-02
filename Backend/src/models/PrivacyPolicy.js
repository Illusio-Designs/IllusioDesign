import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const PrivacyPolicy = sequelize.define('PrivacyPolicy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'privacy_policy',
  timestamps: true
});

export default PrivacyPolicy;

