// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Validates format of the email
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Additional model options if needed
});

module.exports = User;
