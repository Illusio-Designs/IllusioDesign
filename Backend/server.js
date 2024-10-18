const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const morgan = require('morgan'); // Logging middleware for HTTP requests

const userRoutes = require('./routes/Private/userRoutes');
const blogRoutes = require('./routes/Private/blogRoutes');
const projectRoutes = require('./routes/Private/projectRoutes');
const seoRoutes = require('./routes/Private/seoRoutes');

const app = express();
require('dotenv').config();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3001', // Your frontend URL
    credentials: true, // Allow credentials to be included
};

// Middleware
app.use(cors(corsOptions)); // Use the configured CORS options
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // Log incoming requests in development mode

// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/seo', seoRoutes);

// Database synchronization
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit the process if database connection fails
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).json({ message: 'Internal Server Error' });
});

// Handle uncaught exceptions and promise rejections
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // You can perform additional logging here
    process.exit(1); // Exit the process
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // You can perform additional logging here
    process.exit(1); // Exit the process
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
