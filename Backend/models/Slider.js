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
    timestamps: true, // Add timestamps for createdAt and updatedAt
});

// Error handling example for create and update operations
// Example usage (not part of the model):
// Slider.create({ title: 'New Slider', type: 'home', mediaUrl: 'url' })
//     .then(slider => console.log(slider))
//     .catch(error => console.error('Error creating slider:', error));

module.exports = Slider;
