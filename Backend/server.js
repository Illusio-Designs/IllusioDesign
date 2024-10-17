require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./config/database');
require('./middleware/passport-setup');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// Import models
const Blog = require('./models/Blog');
const SEO = require('./models/SEO');
const Project = require('./models/Project');
const User = require('./models/User');
const PagePath = require('./models/pagePath');

// Import association definition function
const defineAssociations = require('./models/associations');

// Private Routes Import
const projectRoutes = require('./routes/private/projectRoutes');
const userRoutes = require('./routes/private/userRoutes');
const blogRoutes = require('./routes/private/blogRoutes');
const seoRoutes = require('./routes/private/seoRoutes');
const sliderRoutes = require('./routes/private/sliderRoutes');
const pagePathRoutes = require('./routes/private/pagePathRoutes');

// Public Routes Import
const projectPublicRoutes = require('./routes/public/projectPublicRoutes');
const blogPublicRoutes = require('./routes/public/blogPublicRoutes');
const seoPublicRoutes = require('./routes/public/seoPublicRoutes');
const sliderPublicRoutes = require('./routes/public/sliderPublicRoutes');
const pagePathsPublicRoutes = require('./routes/public/pagePathPublicRoutes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(helmet());

// Initialize Sequelize Store
const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: 'Sessions',
});

// Sync the session store
sessionStore.sync();

// Session setup with SequelizeStore
app.use(session({
    key: 'session_cookie_name',
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set secure cookies in production
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60, // 1 hour
    },
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define model associations
defineAssociations();

// CORS Configuration for API Routes
const apiCorsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:5173'], // Specify allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

// Apply CORS to API Routes
app.use('/api', cors(apiCorsOptions));
app.use('/api', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/sliders', sliderRoutes);
app.use('/api/page-paths', pagePathRoutes);

// Apply CORS to Public API Routes
app.use('/api/public', cors(apiCorsOptions));
app.use('/api/public/projects', projectPublicRoutes);
app.use('/api/public/seo', seoPublicRoutes);
app.use('/api/public/blogs', blogPublicRoutes);
app.use('/api/public/sliders', sliderPublicRoutes);
app.use('/api/public/page-paths', pagePathsPublicRoutes);

// CORS Configuration for Static Files
const staticCorsOptions = {
    origin: '*', // Allow all origins for static files
    methods: ['GET'],
};

// Apply CORS to Static Routes
app.use('/uploads', cors(staticCorsOptions), express.static(path.join(__dirname, 'uploads')));

// 404 Handler for Public Routes
app.use('/api/public/*', (req, res) => {
    res.status(404).json({ error: 'Public route not found' });
});

// 404 Handler for Private Routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'Private route not found' });
});

// Global error handler
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Sync database and start server
const startServer = async () => {
    try {
        // Sync all models with the database
        await sequelize.sync({ alter: true }); // Consider using migrations for production
        console.log('Database synced');

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
