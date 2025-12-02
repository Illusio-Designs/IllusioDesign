import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const TermsOfService = sequelize.define('TermsOfService', {
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
  tableName: 'terms_of_service',
  timestamps: true
});

export default TermsOfService;

