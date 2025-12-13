import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import publicRoutes from './routes/public/index.js';
import privateRoutes from './routes/private/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initDatabase } from './scripts/initDatabase.js';
import './models/index.js'; // Import models to register them

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

// Middleware
const defaultOrigins = [
  'http://localhost:3000', 
  'http://localhost:3001',
  'https://illusiodesigns.agency',
  'http://illusiodesigns.agency',
  'https://www.illusiodesigns.agency',
  'http://www.illusiodesigns.agency'
];

const envOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : [];

// Combine and remove duplicates
const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Ensure UTF-8 encoding for API responses (not static files)
app.use((req, res, next) => {
  // Skip Content-Type header for static file requests
  if (!req.path.startsWith('/uploads') && !req.path.startsWith('/api/email-status')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
  }
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from uploads directory
// Static files (images) don't need cookies/credentials, so serve them with public CORS
app.use('/uploads', (req, res, next) => {
  // Override CORS for static files - no credentials needed
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  // Cache static files for better performance
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  next();
}, express.static(path.join(__dirname, '../uploads'), {
  setHeaders: (res, path) => {
    // Ensure proper content type for images
    if (path.endsWith('.webp')) {
      res.setHeader('Content-Type', 'image/webp');
    } else if (path.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    }
  }
}));

// Routes
app.use('/api/public', publicRoutes);
app.use('/api/private', privateRoutes);

// Lightweight endpoint to persist consent acceptance in a cookie
app.post('/api/consent-accept', (req, res) => {
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  res.cookie('consentAccepted', 'yes', {
    path: '/',
    maxAge: thirtyDaysMs,
    sameSite: 'lax',
    secure: isProd,
    httpOnly: false // readable by client to skip rendering the banner
  });
  res.sendStatus(204);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Email service status check (for debugging)
app.get('/api/email-status', async (req, res) => {
  try {
    const { checkEmailServiceStatus } = await import('./services/emailService.js');
    const status = checkEmailServiceStatus();
    res.json({ status: 'ok', emailService: status });
  } catch (error) {
    res.json({ status: 'error', error: error.message });
  }
});

// Error handling
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database (create tables, default data, etc.)
    await initDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Database connected and ready`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
