const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
  static associate(models) {
    // Define associations here if needed
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
});

// Sync model to create or update table
sequelize.sync()
  .then(() => {
    console.log("User table has been created or updated!");
  })
  .catch((error) => {
    console.error("Error syncing the User model:", error);
  });

module.exports = User;
