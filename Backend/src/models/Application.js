import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  contact: {
    type: DataTypes.STRING
  },
  portfolio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  positionId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'positions',
      key: 'id'
    }
  },
  resume: {
    type: DataTypes.STRING
  },
  coverLetter: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'accepted', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'applications',
  timestamps: true
});

export default Application;
