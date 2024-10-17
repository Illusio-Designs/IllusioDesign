// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    console.log(`Authentication check for: ${req.originalUrl}`);

    // Check for session-based authentication
    if (req.isAuthenticated && req.isAuthenticated()) {
        console.log(`User authenticated via session: ${req.user.email}`);
        return next();
    }

    // Check for JWT token in the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from header
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.warn(`Unauthorized access attempt with invalid token to: ${req.originalUrl} from IP: ${req.ip}`);
                return res.status(401).json({ error: 'Unauthorized' });
            }
            req.userId = decoded.id; // Save user ID for later use
            console.log(`User authenticated via token: ${decoded.id}`);
            return next();
        });
    } else {
        console.warn(`Unauthorized access attempt to: ${req.originalUrl} from IP: ${req.ip}`);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { authenticate };
