const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Blog extends Model {
    static associate(models) {
      Blog.belongsTo(models.SEO, {
        foreignKey: 'seoId',
        as: 'seo'
      });
    }
  }

  Blog.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SEOs',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs'
  });

  return Blog;
};