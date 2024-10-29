const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define upload directories for different entities
const uploadDirs = {
    user: 'uploads/user',
    project: 'uploads/project',
    blog: 'uploads/blog',
};

// Ensure the upload directory exists
const createUploadDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create all necessary upload directories
Object.values(uploadDirs).forEach(createUploadDir);

// Configure Multer storage with dynamic destination based on field name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath;
        switch (file.fieldname) {
            case 'image':
                uploadPath = uploadDirs.user; // Store user images in uploads/user
                break;
            case 'projectImage':
                uploadPath = uploadDirs.project;
                break;
            case 'blogImage':
                uploadPath = uploadDirs.blog;
                break;
            default:
                return cb(new Error('Invalid field name'), false);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname).toLowerCase();
        const originalName = path.basename(file.originalname, extension);
        const filename = `${originalName}-${timestamp}${extension}`;
        cb(null, filename);
    },
});

// File filter for image validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'), false);
    }
};

// Create multer instance with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
});

// Export the upload instance
module.exports = upload;
