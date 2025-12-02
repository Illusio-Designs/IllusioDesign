import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const ContactMessage = sequelize.define('ContactMessage', {
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
  phone: {
    type: DataTypes.STRING
  },
  subject: {
    type: DataTypes.STRING
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('unread', 'read', 'replied'),
    defaultValue: 'unread'
  }
}, {
  tableName: 'contact_messages',
  timestamps: true
});

export default ContactMessage;
