// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import CORS
const sequelize = require('./config/database');
const userRoutes = require('./routes/private/userRoutes');
require('./passport-setup'); // Import Passport configuration

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Session setup
app.use(session({
    secret: 'Rishi@1995', // Change this to a secure key
    resave: false,
    saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use user routes
app.use('/api', userRoutes);

// Sync database and start server
const startServer = async () => {
    try {
        await sequelize.sync({ alter: true }); // This will update the table without dropping it
        console.log('Database synced');
        app.listen(5000, () => { // Change to port 5000 if needed
            console.log('Server is running on port 5000');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();