// middleware/auth.js
const authenticate = (req, res, next) => {
    console.log(`Authentication check for: ${req.originalUrl}`);
    if (req.isAuthenticated && req.isAuthenticated()) {
        console.log(`User authenticated: ${req.user.email}`);
        return next();
    }
    console.warn(`Unauthorized access attempt to: ${req.originalUrl} from IP: ${req.ip}`);
    res.status(401).json({ error: 'Unauthorized' });
};

module.exports = { authenticate };
