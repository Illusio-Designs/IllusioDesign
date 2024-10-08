// passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User'); // Import your User model

passport.serializeUser((user, done) => {
    done(null, user.id); // Store user ID in session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user); // Retrieve user from database
    } catch (error) {
        done(error, null);
    }
});

// Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists in the database
        let user = await User.findOne({ where: { email: profile.emails[0].value } });
        if (!user) {
            // If not, create a new user
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: null, // No password for Google login
            });
        }
        done(null, user); // User found or created
    } catch (error) {
        done(error, null);
    }
}));