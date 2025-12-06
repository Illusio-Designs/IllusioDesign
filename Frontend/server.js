// Custom Next.js Server Entry Point
// This file is used to start the Next.js server on your hosting provider
// Run with: node server.js

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Change to the directory where server.js is located
// This ensures Next.js can find next.config.js and the src/app directory
const serverDir = __dirname;
process.chdir(serverDir);

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

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

