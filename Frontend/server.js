// Custom Next.js Server Entry Point
// This file is used to start the Next.js server on your hosting provider
// Run with: node server.js

const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const fs = require('fs');
const next = require('next');

// Change to the directory where server.js is located
// This ensures Next.js can find next.config.js and the src/app directory
const serverDir = __dirname;
process.chdir(serverDir);

// Verify that src/app directory exists
const srcAppDir = path.join(serverDir, 'src', 'app');
const appDirCheck = path.join(serverDir, 'app');

if (!fs.existsSync(srcAppDir) && !fs.existsSync(appDirCheck)) {
  console.error('❌ Error: Could not find app directory!');
  console.error('Looking for:', srcAppDir);
  console.error('Or:', appDirCheck);
  console.error('Current working directory:', process.cwd());
  console.error('Server.js directory:', serverDir);
  console.error('\nPlease ensure the src directory with app folder is deployed.');
  process.exit(1);
}

console.log('✅ Found app directory at:', fs.existsSync(srcAppDir) ? srcAppDir : appDirCheck);

// Force production mode for live deployment
// In cPanel, set Application mode to "Production" to set NODE_ENV=production
const dev = false; // Always use production mode on server
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

console.log(`🚀 Starting in ${dev ? 'development' : 'production'} mode`);
console.log(`📁 Working directory: ${process.cwd()}`);
console.log(`📦 .next directory exists: ${fs.existsSync(path.join(serverDir, '.next'))}`);

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

