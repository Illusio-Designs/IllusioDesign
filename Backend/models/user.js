// models/user.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as necessary

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // Store only the filename
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'User',
});

// Export the model
module.exports = User;
