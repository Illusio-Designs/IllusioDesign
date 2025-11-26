import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
const imagesDir = path.join(uploadsDir, 'images');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Configure multer for temporary storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, uniqueSuffix + '-' + originalName);
  }
});

// File filter - only allow image files
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only image files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Middleware to convert uploaded images to WebP
export const convertToWebP = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const inputPath = req.file.path;
    const originalName = path.parse(req.file.originalname).name;
    
    // If file is already WebP, just rename and update paths
    if (req.file.mimetype === 'image/webp' || inputPath.toLowerCase().endsWith('.webp')) {
      const outputPath = path.join(imagesDir, `${originalName}-${Date.now()}.webp`);
      fs.renameSync(inputPath, outputPath);
      
      req.file.filename = path.basename(outputPath);
      req.file.path = outputPath;
      req.file.mimetype = 'image/webp';
      req.file.originalname = `${originalName}.webp`;
      req.file.webpPath = `/uploads/images/${req.file.filename}`;
      
      return next();
    }

    // Convert other formats to WebP
    const outputPath = path.join(imagesDir, `${originalName}-${Date.now()}.webp`);

    // Convert image to WebP
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    // Delete original file
    fs.unlinkSync(inputPath);

    // Update file info
    req.file.filename = path.basename(outputPath);
    req.file.path = outputPath;
    req.file.mimetype = 'image/webp';
    req.file.originalname = `${originalName}.webp`;
    req.file.webpPath = `/uploads/images/${req.file.filename}`;

    next();
  } catch (error) {
    // Clean up on error
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ error: 'Error converting image to WebP: ' + error.message });
  }
};

// Middleware for multiple file uploads
export const convertMultipleToWebP = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  try {
    const convertedFiles = [];

    for (const file of req.files) {
      const inputPath = file.path;
      const originalName = path.parse(file.originalname).name;
      
      // If file is already WebP, just rename and update paths
      if (file.mimetype === 'image/webp' || inputPath.toLowerCase().endsWith('.webp')) {
        const outputPath = path.join(imagesDir, `${originalName}-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`);
        fs.renameSync(inputPath, outputPath);
        
        file.filename = path.basename(outputPath);
        file.path = outputPath;
        file.mimetype = 'image/webp';
        file.originalname = `${originalName}.webp`;
        file.webpPath = `/uploads/images/${file.filename}`;
        
        convertedFiles.push(file);
        continue;
      }

      // Convert other formats to WebP
      const outputPath = path.join(imagesDir, `${originalName}-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`);

      // Convert image to WebP
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      // Delete original file
      fs.unlinkSync(inputPath);

      // Update file info
      file.filename = path.basename(outputPath);
      file.path = outputPath;
      file.mimetype = 'image/webp';
      file.originalname = `${originalName}.webp`;
      file.webpPath = `/uploads/images/${file.filename}`;

      convertedFiles.push(file);
    }

    req.files = convertedFiles;
    next();
  } catch (error) {
    // Clean up on error
    req.files.forEach(file => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
    return res.status(500).json({ error: 'Error converting images to WebP: ' + error.message });
  }
};

export { upload };

