const User = require('../../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        console.log(`Attempting to register user with email: ${email}`);
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.warn(`Registration failed: User with email ${email} already exists.`);
            return res.status(400).json({ error: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        console.log(`User registered successfully: ${email}`);
        res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Login a user
const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!user) {
            console.warn(`Login failed: ${info.message} for email: ${req.body.email}`);
            return res.status(401).json({ error: info.message || 'Invalid credentials' });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log(`User logged in successfully: ${user.email}`);
            return res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
        });
    })(req, res, next);
};

// Logout a user
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destruction error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.clearCookie('session_cookie_name'); // Replace with your session cookie name if different
            console.log(`User logged out successfully`);
            res.status(200).json({ message: 'Logout successful' });
        });
    });
};

// Get current logged-in user
const getCurrentUser = (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json(req.user);
    }
    return res.status(401).json({ error: 'User not authenticated' });
};

// Export the controller functions
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
};
