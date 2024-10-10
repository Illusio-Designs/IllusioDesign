// models/Project.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    services: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timeline: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    mainImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    secondImage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    assetLink: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = Project;
