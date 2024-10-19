const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const sequelize = require('./config/db');
const morgan = require('morgan'); // Logging middleware
const userRoutes = require('./routes/Private/userRoutes');
const blogRoutes = require('./routes/Private/blogRoutes');
const projectRoutes = require('./routes/Private/projectRoutes');
const seoRoutes = require('./routes/Private/seoRoutes');

const app = express();
require('dotenv').config();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3001', // Frontend URL
    credentials: true, // Allow credentials to be included in CORS
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // Cookie parser to parse cookies

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        maxAge: 3600000, // 1 hour
    }
}));

app.use(morgan('dev')); // Logging middleware for incoming requests

// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/seo', seoRoutes);

// Database synchronization
const initializeDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('Database & tables created!');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit if database connection fails
    }
};

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack
    res.status(500).json({ message: 'Internal Server Error' });
});

// Handle uncaught exceptions and promise rejections
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Start the server
const startServer = async () => {
    await initializeDatabase();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
