const multer = require('multer');
const path = require('path');

// Define the storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination to uploads/users
    const uploadPath = path.join(__dirname, '../uploads/users');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Set the filename to include a timestamp to avoid collisions
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid filename collisions
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;
