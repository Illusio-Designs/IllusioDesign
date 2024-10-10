// config.js
// require('dotenv').config(); // Load environment variables

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
// });

// module.exports = sequelize;


// config/database.js
require('dotenv').config(); // Load environment variables

const { Sequelize } = require('sequelize');

// Validate required environment variables
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_DIALECT'];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1); // Exit the application with an error code
}

// Initialize Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT.toLowerCase(), // Ensure dialect is in lowercase
        logging: process.env.DB_LOGGING === 'true' ? console.log : false, // Enable or disable logging based on env
        pool: {
            max: process.env.DB_POOL_MAX ? parseInt(process.env.DB_POOL_MAX) : 5,
            min: process.env.DB_POOL_MIN ? parseInt(process.env.DB_POOL_MIN) : 0,
            acquire: process.env.DB_POOL_ACQUIRE ? parseInt(process.env.DB_POOL_ACQUIRE) : 30000,
            idle: process.env.DB_POOL_IDLE ? parseInt(process.env.DB_POOL_IDLE) : 10000,
        },
        define: {
            freezeTableName: true, // Prevent Sequelize from pluralizing table names
            timestamps: true, // Enable timestamps globally
        },
    }
);

// Test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit the application with an error code
    }
};

// Invoke the test connection
testConnection();

module.exports = sequelize;
