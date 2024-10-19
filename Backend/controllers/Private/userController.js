const User = require('../../models/userModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// User controller

// Create a new user
exports.createUser = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  try {
    const { username, password, email } = req.body;
    const hashedPassword = md5(password);
    const userImage = req.file ? req.file.filename : null;

    if (!userImage) {
      return res.status(400).json({ error: 'User image is required' });
    }

    const user = await User.create({ username, password: hashedPassword, email, userImage });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user (with JWT, session, and cookies)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== md5(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    // Set JWT as a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });

    // Create session
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Logout user
// Logout user
exports.logoutUser = (req, res) => {
  res.clearCookie('token'); // Clear the JWT cookie
  req.session.destroy(err => {
      if (err) {
          return res.status(500).json({ message: 'Failed to logout' });
      }
      res.status(200).json({ message: 'User logged out successfully' });
  });
};

