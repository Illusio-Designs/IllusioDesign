// middleware/multerConfig.js
const multer = require('multer');
const path = require('path');

// File filter function to accept only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type, only JPEG, PNG, and GIF are allowed!'), false); // Reject the file
  }
};

// Function to set up storage for uploaded files based on the destination folder
const setStorage = (destinationFolder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationFolder); // Set the destination folder for uploads
    },
    filename: (req, file, cb) => {
      // Set the filename to the current timestamp plus the original file extension
      const uniqueName = `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;
      cb(null, uniqueName);
    },
  });
};

// Storage configurations for different types of uploads
const projectStorage = setStorage('uploads/projects');
const blogStorage = setStorage('uploads/blogs');
const sliderStorage = setStorage('uploads/sliders');

// Set file size limits (5 MB for files and 10 MB for fields)
const limits = { 
  fileSize: 5 * 1024 * 1024,    // 5 MB
  fieldSize: 10 * 1024 * 1024,  // 10 MB
};

// Create Multer instances for different upload types
const uploadProject = multer({ storage: projectStorage, fileFilter, limits });
const uploadBlog = multer({ storage: blogStorage, fileFilter, limits });
const uploadSlider = multer({ storage: sliderStorage, fileFilter, limits });

// Export the different Multer upload configurations
module.exports = { uploadProject, uploadBlog, uploadSlider };
