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



// private routes
const userRoutes = require('./routes/private/userRoutes');
const projectRoutes = require('./routes/private/projectRoutes');
const blogRoutes = require('./routes/private/blogRoutes');
const seoRoutes = require('./routes/private/seoRoutes');
const appointmentRoutes = require('./routes/private/appointmentRoutes');

// Public Routes
const projectPublicRoutes = require('./routes/public/projectPublicRoutes');
const blogPublicRoutes = require('./routes/public/blogPublicRoutes');
const seoPublicRoutes = require('./routes/public/seoPublicRoutes');
const appointmentPublicRoutes = require('./routes/public/appointmentPublicRoutes');

// Create express app
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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Session setup
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

// Static files middleware
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Origin', allowedOrigins.join(', '));
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/blogs', blogRoutes);
app.use('/seo', seoRoutes);
app.use('/appointment', appointmentRoutes);

app.use('/api/public/projects', projectPublicRoutes);
app.use('/api/public/blogs', blogPublicRoutes);
app.use('/api/public/seo', seoPublicRoutes);
app.use('/api/public/appointment', appointmentPublicRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error',
    message: 'Route not found!',
    path: req.originalUrl 
  });
});

// Error handler
app.use((err, req, res, next) => {
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

// Database connection and sync function
const initializeDatabase = async () => {
  try {
    // Test connection
    await sequelize.authenticate();

    // Sync all models
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
    } else {
      await sequelize.sync();
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

startServer();

module.exports = app;
