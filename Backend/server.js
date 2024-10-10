// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import CORS
const sequelize = require('./config/database'); // Ensure this is the correct path
require('./middleware/passport-setup'); // Import Passport configuration

// Private Routes Import
const projectRoutes = require('./routes/private/projectRoutes'); // Import project routes
const userRoutes = require('./routes/private/userRoutes'); // Import user routes

// Public Routes Import
const projectPublicRoutes = require('./routes/public/projectPublicRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Initialize Sequelize Store
const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: 'Sessions', // Optional: customize session table name
});

// Sync the session store
sessionStore.sync();

// Session setup with SequelizeStore
app.use(session({
    key: 'session_cookie_name', // Customize session cookie name if desired
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Use a strong secret in production
    store: sessionStore, // Use SequelizeStore
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set to true in production (HTTPS)
        httpOnly: true, // Mitigates XSS attacks
        sameSite: 'lax', // Helps protect against CSRF attacks
        maxAge: 1000 * 60 * 60, // 1 hour
    },
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', userRoutes); // User routes for login and registration
app.use('/api/projects', projectRoutes); // Project routes
app.use('/api/public/projects', projectPublicRoutes); // Public project routes

// Sync database and start server
const startServer = async () => {
    try {
        await sequelize.sync({ alter: true }); // Sync the database
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
