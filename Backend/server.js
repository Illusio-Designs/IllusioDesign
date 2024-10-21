const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors'); // Import CORS
const sequelize = require('./config/database');

const userRoutes = require('./routes/private/userRoutes');

// Load environment variables early
dotenv.config();

// Create an instance of the express app
const app = express();

// Middleware setup
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  preflightContinue: false, // End preflight request (OPTIONS) with a response
  optionsSuccessStatus: 204 // Response status code for successful OPTIONS requests
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET, // Store your secret in .env file
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Secure in production
    maxAge: 1000 * 60 * 60 * 2 // Session cookie expires in 2 hours
  }
}));

// Serve static files from 'uploads' (for serving uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Private routes
app.use('/users', userRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err); // Log the entire error object
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
