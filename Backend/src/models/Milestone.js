import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/**
 * Company roadmap / journey milestone — one entry per point on the public
 * "Our Journey" timeline. Ordered by `order`, then by id.
 */
const Milestone = sequelize.define('Milestone', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Free-form period label, e.g. "2015", "Jun 1, 2017", "Q1 2018".
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'published'
  }
}, {
  tableName: 'milestones',
  timestamps: true
});

export default Milestone;
