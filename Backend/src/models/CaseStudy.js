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
    type: DataTypes.TEXT('long'), // Use TEXT('long') like description for HTML content
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    // Store as HTML string directly (like description) - handle both HTML and legacy array format
    get() {
      const value = this.getDataValue('results');
      if (!value) return null;
      // If it's already a string, check if it's HTML or JSON
      if (typeof value === 'string') {
        // Check if it looks like HTML (contains HTML tags)
        if (value.includes('<p>') || value.includes('<ul>') || value.includes('<ol>') || value.includes('<li>') || value.includes('<div>') || value.includes('<h1>') || value.includes('<h2>') || value.includes('<h3>') || value.includes('<br>') || value.includes('<strong>') || value.includes('<em>')) {
          return value; // Return HTML string
        }
        // Check if it's JSON array (old format)
        if (value.trim().startsWith('[') && value.trim().endsWith(']')) {
          try {
            return JSON.parse(value);
          } catch (e) {
            return value; // Return as string if JSON parse fails
          }
        }
        return value; // Return as string (plain text or HTML without tags)
      }
      return value;
    },
    set(value) {
      // Store as string directly - preserve HTML content
      if (value === null || value === undefined) {
        this.setDataValue('results', null);
      } else if (Array.isArray(value)) {
        // Legacy format: convert array to JSON string
        this.setDataValue('results', JSON.stringify(value));
      } else {
        // Store as string directly (HTML or plain text)
        this.setDataValue('results', String(value));
      }
    }
  },
  conclusion: {
    type: DataTypes.TEXT('long'), // Use TEXT('long') like description for HTML content
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
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
