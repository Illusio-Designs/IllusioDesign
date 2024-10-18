const User = require('../../models/userModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// User controller

exports.createUser = async (req, res) => {
  console.log('Request body:', req.body); // Log the request body
  console.log('Uploaded file:', req.file); // Log the uploaded file

  try {
    const { username, password, email } = req.body; // Extract username, email, and password from body
    const hashedPassword = md5(password); // Hash the password using MD5
    const userImage = req.file ? req.file.filename : null; // Get the filename from multer

    // Check if the image is null
    if (!userImage) {
      return res.status(400).json({ error: 'User image is required' }); // Send error if no image
    }

    // Create the user
    const user = await User.create({ username, password: hashedPassword, email, userImage });
    res.status(201).json(user); // Return created user
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error message if something goes wrong
  }
};


// Login user
// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // Ensure you're using email
    const user = await User.findOne({ where: { email } }); // Search by email

    if (!user || user.password !== md5(password)) { // Check password
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (error) {
    console.error('Login Error:', error); // Log error details to the console
    res.status(500).json({ error: error.message }); // Send error message as response
  }
};


// Logout user
exports.logoutUser = (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
};
