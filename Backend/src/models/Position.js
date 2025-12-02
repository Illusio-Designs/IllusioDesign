import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Position = sequelize.define('Position', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  requirements: {
    type: DataTypes.TEXT
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'positions',
  timestamps: true
});

export default Position;
