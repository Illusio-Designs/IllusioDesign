import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const CaseStudy = sequelize.define('CaseStudy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT('long'), // Use TEXT with explicit length for better emoji support
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  },
  image: {
    type: DataTypes.STRING
  },
  link: {
    type: DataTypes.STRING
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
  techStack: {
    type: DataTypes.TEXT,
    get() {
      const value = this.getDataValue('techStack');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('techStack', JSON.stringify(Array.isArray(value) ? value : []));
    }
  },
  timeline: {
    type: DataTypes.STRING
  },
  results: {
    type: DataTypes.TEXT,
    get() {
      const value = this.getDataValue('results');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('results', JSON.stringify(Array.isArray(value) ? value : []));
    }
  },
  location: {
    type: DataTypes.STRING
  },
  projectName: {
    type: DataTypes.STRING
  },
  overview: {
    type: DataTypes.TEXT
  },
  overviewExtended: {
    type: DataTypes.TEXT
  },
  industry: {
    type: DataTypes.STRING
  },
  year: {
    type: DataTypes.STRING
  },
  services: {
    type: DataTypes.STRING
  },
  duration: {
    type: DataTypes.STRING
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
  seoKeywords: {
    type: DataTypes.TEXT
  },
  additionalImages: {
    type: DataTypes.TEXT,
    get() {
      const value = this.getDataValue('additionalImages');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('additionalImages', JSON.stringify(Array.isArray(value) ? value : []));
    }
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'case_studies',
  timestamps: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

export default CaseStudy;
