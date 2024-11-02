const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');

// Load environment variables early
dotenv.config();

// Private routes
const userRoutes = require('./routes/private/userRoutes');
const projectRoutes = require('./routes/private/projectRoutes');
const blogRoutes = require('./routes/private/blogRoutes');
const seoRoutes = require('./routes/private/seoRoutes');

// Public Routes
const projectPublicRoutes = require('./routes/public/projectPublicRoutes');
const blogPublicRoutes = require('./routes/public/blogPublicRoutes');
const seoPublicRoutes = require('./routes/public/seoPublicRoutes');

// Create an instance of the express app
const app = express();

// Security middleware with customized Helmet configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "blob:", "http:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "http:", "https:"],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
}));

// CORS setup
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' })); // Increased limit for larger payloads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-fallback-secret-key-here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 2 // 2 hours
  }
}));

// Custom middleware to handle static file requests
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Origin', allowedOrigins.join(', '));
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Private routes
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/blogs', blogRoutes);
app.use('/seo', seoRoutes)

// Public routes
app.use('/api/public/projects', projectPublicRoutes);
app.use('/api/public/blogs', blogPublicRoutes);
app.use('/api/public/seo', seoPublicRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling for unknown routes (404)
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error',
    message: 'Route not found!',
    path: req.originalUrl 
  });
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err);
  
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'An internal server error occurred'
    : err.message;

  res.status(status).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Define the port
const PORT = process.env.PORT || 3000;

// Database connection with retry logic
const connectWithRetry = async (retries = 5, interval = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.sync(); // This is where tables are created/updated
      console.log('Database connection established successfully');
      return true;
    } catch (err) {
      console.error(`Database connection attempt ${i + 1} failed:`, err);
      if (i === retries - 1) throw err; // If all retries fail, throw the error
      await new Promise(resolve => setTimeout(resolve, interval)); // Wait before retrying
    }
  }
  return false;
};

// Start server
const startServer = async () => {
  try {
    await connectWithRetry();
    
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

module.exports = app; // Export for testing