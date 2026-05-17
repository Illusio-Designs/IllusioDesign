import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/**
 * Unified legal policy table — replaces the separate privacy_policy and
 * terms_of_service tables. One row per `type`.
 */
const Policy = sequelize.define('Policy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('privacy', 'terms'),
    allowNull: false,
    unique: true
  },
  content: {
    type: DataTypes.TEXT('long'),
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    allowNull: false
  },
  lastUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'policies',
  timestamps: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

export default Policy;
