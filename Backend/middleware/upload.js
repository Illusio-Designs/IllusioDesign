// middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const createUploadDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Create upload directories
const userUploadDir = 'uploads/user';
const projectUploadDir = 'uploads/project';
const blogUploadDir = 'uploads/blog'; // New blog upload directory
createUploadDir(userUploadDir);
createUploadDir(projectUploadDir);
createUploadDir(blogUploadDir); // Ensure blog directory exists

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dynamically set upload directory based on the field name
    if (file.fieldname === 'image') {
      cb(null, userUploadDir);
    } else if (file.fieldname === 'projectImage') {
      cb(null, projectUploadDir);
    } else if (file.fieldname === 'blogImage') { // New field for blog image
      cb(null, blogUploadDir);
    } else {
      cb(new Error('Invalid field name'), false);
    }
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const filename = `image-${timestamp}${extension}`;
    cb(null, filename);
  }
});

// File filter for images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

module.exports = upload;
