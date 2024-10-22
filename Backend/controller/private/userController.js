const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

// Utility function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '1h',
  });
};

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: username, email, and password' 
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user data
    const userData = {
      username,
      email,
      password: hashedPassword,
    };

    // Add image if it exists
    if (req.file) {
      userData.image = req.file.filename;
    }

    // Create a new user
    const newUser = await User.create(userData);

    // Remove password from response
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      image: newUser.image
    };

    // Generate a token
    const token = generateToken(newUser.id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Other controller methods remain the same...
// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Create JWT token
    const token = generateToken(user.id); // Use the generateToken function
    const expiresIn = 3600; // 1 hour in seconds
    res.json({ message: 'Login successful', token, expiresIn });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Logout user (if using JWT-based authentication)
exports.logout = (req, res) => {
  res.json({ message: 'Logout successful. Token should be deleted on client side.' });
};

// Get list of all users (excluding password)
exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'image'] // Exclude password
    });
    res.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
  const userId = req.params.id; // Get user ID from request parameters
  const { username, email, password } = req.body; // Extract new values from request body

  try {
    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10); // Hash new password
    if (req.file) user.image = req.file.filename; // Update image if provided

    await user.save(); // Save updated user
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  const userId = req.params.id; // Get user ID from request parameters

  try {
    const result = await User.destroy({ where: { id: userId } });
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};


// Get user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'image'], // Exclude password
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};