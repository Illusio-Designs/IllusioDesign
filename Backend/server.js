const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet'); // Import Helmet for security headers
const sequelize = require('./config/database');

// Private routes
const userRoutes = require('./routes/private/userRoutes');
const projectRoutes = require('./routes/private/projectRoutes');
const seoRoutes = require('./routes/private/seoRoutes');
const blogRoutes = require('./routes/private/blogRoutes');

// Public Routes
const projectPublicRoutes = require('./routes/public/projectPublicRoutes');
const blogPublicRoutes = require('./routes/public/blogPublicRoutes');

// Load environment variables early
dotenv.config();

// Create an instance of the express app
const app = express();

// Security middleware
app.use(helmet()); // Set secure headers

// CORS setup
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Replace with your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET, // Secret from .env
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Secure in production
    httpOnly: true, // Prevent client-side JavaScript from accessing cookies
    maxAge: 1000 * 60 * 60 * 2 // Cookie expires in 2 hours
  }
}));

// Serve static files from 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Private routes
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/seo', seoRoutes);
app.use('/blog', blogRoutes);

// Public routes
app.use('/api/public/projects', projectPublicRoutes);
app.use('/api/public/blogs', blogPublicRoutes);

// Error handling for unknown routes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found!' });
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log stack trace for debugging
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Define the port
const PORT = process.env.PORT || 3000;

// Sync database and start server
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
