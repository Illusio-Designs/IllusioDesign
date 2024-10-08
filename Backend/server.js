// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
require('./passport-setup'); // Import Passport configuration

const app = express();
app.use(express.json());
app.use(cookieParser());

// Session setup
app.use(session({
    secret: 'your_secret_key', // Change this to a secure key
    resave: false,
    saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use user routes
app.use('/api', userRoutes);

// Google authentication routes
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login', // Redirect to login on failure
}), (req, res) => {
    // Successful authentication, redirect to a protected route
    res.redirect('/api/users'); // Redirect to users or any other route
});

// Sync database and start server
const startServer = async () => {
    try {
        await sequelize.sync({ force: true }); // This will create the tables
        console.log('Database synced');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();