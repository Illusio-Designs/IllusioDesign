import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  category: {
    type: DataTypes.STRING
  },
  tags: {
    type: DataTypes.TEXT,
    get() {
      const value = this.getDataValue('tags');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('tags', JSON.stringify(Array.isArray(value) ? value : []));
    }
  },
  content: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  },
  author: {
    type: DataTypes.STRING
  },
  publishDate: {
    type: DataTypes.DATEONLY
  },
  seoTitle: {
    type: DataTypes.STRING
  },
  metaDescription: {
    type: DataTypes.TEXT
  },
  seoUrl: {
    type: DataTypes.STRING
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'blogs',
  timestamps: true
});

export default Blog;
