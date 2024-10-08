// middleware/auth.js
const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
    }
    res.status(403).json({ error: 'Forbidden' }); // User is not authenticated
};

module.exports = authenticate;