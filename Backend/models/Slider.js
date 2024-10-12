// models/Slider.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

class Slider extends Model {}

Slider.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('project', 'home'),
        allowNull: false,
    },
    mediaUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Slider',
});

module.exports = Slider;
