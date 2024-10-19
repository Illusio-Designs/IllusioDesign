// config/multer.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload folder exists
const ensureUploadPathExists = (uploadPath) => {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
};

// Storage configuration for user images
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/users');
    ensureUploadPathExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Multer middleware for user image upload
const uploadUserImage = multer({ storage: userStorage });

// Storage configuration for project images
const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/projects');
    ensureUploadPathExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const uploadProjectImage = multer({ storage: projectStorage });

module.exports = { uploadUserImage, uploadProjectImage };
