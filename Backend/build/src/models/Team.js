import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Team = sequelize.define('Team', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING
  },
  bio: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'team',
  timestamps: true
});

export default Team;
