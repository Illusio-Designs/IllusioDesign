// middleware/passport-setup.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

// Configure the local strategy
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        console.log(`Passport LocalStrategy: Authenticating email: ${email}`);
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                console.warn(`User with email ${email} not found.`);
                return done(null, false, { message: 'Incorrect email.' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.warn(`Incorrect password for email ${email}.`);
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log(`User authenticated: ${email}`);
            return done(null, user);
        } catch (error) {
            console.error('Passport LocalStrategy Error:', error);
            return done(error);
        }
    }
));

// Serialize user into the session
passport.serializeUser((user, done) => {
    console.log(`Serializing user ID: ${user.id}`);
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    console.log(`Deserializing user ID: ${id}`);
    try {
        const user = await User.findByPk(id);
        if (!user) {
            console.warn(`User with ID ${id} not found.`);
            return done(null, false);
        }
        console.log(`User deserialized: ${user.email}`);
        done(null, user);
    } catch (error) {
        console.error('DeserializeUser Error:', error);
        done(error);
    }
});
