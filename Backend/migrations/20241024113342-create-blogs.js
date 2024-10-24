// migrations/YYYYMMDDHHMMSS-create-blogs.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      publish_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      seoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SEOs', // Make sure this matches your SEO table name
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add indexes for better query performance
    await queryInterface.addIndex('blogs', ['seoId']);
    await queryInterface.addIndex('blogs', ['publish_date']);
    await queryInterface.addIndex('blogs', ['category']);
  },

  async down(queryInterface, Sequelize) {
    // Remove indexes first
    await queryInterface.removeIndex('blogs', ['seoId']);
    await queryInterface.removeIndex('blogs', ['publish_date']);
    await queryInterface.removeIndex('blogs', ['category']);

    // Drop the table
    await queryInterface.dropTable('blogs');
  }
};