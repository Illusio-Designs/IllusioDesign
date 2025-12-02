import jwt from 'jsonwebtoken';

// Get JWT secret with fallback
const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn('⚠️  WARNING: JWT_SECRET not set in environment variables. Using default (INSECURE for production!)');
    return 'your-secret-key-change-this-in-production-min-32-characters-long';
  }
  return secret;
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, getJWTSecret());
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Admin access required' });
  }
};
