import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

// Get JWT secret with fallback
const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn('⚠️  WARNING: JWT_SECRET not set in environment variables. Using default (INSECURE for production!)');
    return 'your-secret-key-change-this-in-production-min-32-characters-long';
  }
  return secret;
};

export const register = async (req, res) => {
  try {
    const { email, password, username, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const user = await User.create({
      email,
      name: name || username || email.split('@')[0], // Use name, username, or email prefix
      password, // Will be hashed by the beforeCreate hook
      role: 'user'
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      getJWTSecret(),
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    const { password: _, ...safeUser } = user.toJSON();
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: safeUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if password is hashed (starts with $2a$ or $2b$)
    const isPasswordHashed = user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'));
    
    let isValidPassword = false;
    if (isPasswordHashed) {
      // Password is hashed, compare with bcrypt
      isValidPassword = await bcrypt.compare(password, user.password);
    } else {
      // Password might not be hashed (legacy data), compare directly
      isValidPassword = user.password === password;
      
      // If direct comparison works but password isn't hashed, hash it now
      if (isValidPassword) {
        user.password = await bcrypt.hash(password, 10);
        await user.save();
      }
    }

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      getJWTSecret(),
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    const { password: _, ...safeUser } = user.toJSON();
    res.json({
      message: 'Login successful',
      token,
      user: safeUser
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // In a stateless JWT system, logout is handled client-side by removing the token
    // But we can add server-side token blacklisting here if needed in the future
    res.json({
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
