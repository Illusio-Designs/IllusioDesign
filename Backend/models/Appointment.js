const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Appointment extends Model {}

Appointment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  mobileNo: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 20]
    }
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  budget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
    defaultValue: 'pending',
    allowNull: false
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString()
    }
  }
}, {
  sequelize,
  modelName: 'Appointment',
  tableName: 'appointments',
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: ['email'] },
    { fields: ['status'] }
  ]
});

module.exports = Appointment;