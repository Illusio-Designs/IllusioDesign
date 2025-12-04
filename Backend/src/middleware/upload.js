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
const blogDir = path.join(imagesDir, 'blog');
const projectDir = path.join(imagesDir, 'project');

// Create directories if they don't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}
if (!fs.existsSync(projectDir)) {
  fs.mkdirSync(projectDir, { recursive: true });
}

// Helper function to generate filename
const generateFilename = (file) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const originalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
  return uniqueSuffix + '-' + originalName;
};

// Configure multer storage for blog images
const blogStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, blogDir);
  },
  filename: (req, file, cb) => {
    cb(null, generateFilename(file));
  }
});

// Configure multer storage for project/case study images
const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, projectDir);
  },
  filename: (req, file, cb) => {
    cb(null, generateFilename(file));
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

// Multer instances for blog and project uploads
export const uploadBlog = multer({
  storage: blogStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

export const uploadProject = multer({
  storage: projectStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Default upload (for backward compatibility, uses project directory)
const upload = uploadProject;

// Helper function to determine upload type and directory
const getUploadType = (filePath) => {
  if (filePath.includes('blog')) {
    return { type: 'blog', dir: blogDir, urlPath: '/uploads/images/blog' };
  } else if (filePath.includes('project')) {
    return { type: 'project', dir: projectDir, urlPath: '/uploads/images/project' };
  }
  // Default to project for backward compatibility
  return { type: 'project', dir: projectDir, urlPath: '/uploads/images/project' };
};

// Middleware to convert uploaded images to WebP
export const convertToWebP = async (req, res, next) => {
  // Handle single file upload (req.file)
  if (req.file) {
    try {
      const inputPath = req.file.path;
      const originalName = path.parse(req.file.originalname).name;
      const { dir, urlPath } = getUploadType(inputPath);
      
      // If file is already WebP, just rename and update paths
      if (req.file.mimetype === 'image/webp' || inputPath.toLowerCase().endsWith('.webp')) {
        const outputPath = path.join(dir, `${originalName}-${Date.now()}.webp`);
        fs.renameSync(inputPath, outputPath);
        
        req.file.filename = path.basename(outputPath);
        req.file.path = outputPath;
        req.file.mimetype = 'image/webp';
        req.file.originalname = `${originalName}.webp`;
        req.file.webpPath = `${urlPath}/${req.file.filename}`;
        
        return next();
      }

      // Convert other formats to WebP
      const outputPath = path.join(dir, `${originalName}-${Date.now()}.webp`);

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
      req.file.webpPath = `${urlPath}/${req.file.filename}`;

      return next();
    } catch (error) {
      // Clean up on error
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({ error: 'Error converting image to WebP: ' + error.message });
    }
  }
  
  // Handle fields upload (req.files.image[0])
  if (req.files && req.files.image && req.files.image[0]) {
    try {
      const file = req.files.image[0];
      const inputPath = file.path;
      const originalName = path.parse(file.originalname).name;
      const { dir, urlPath } = getUploadType(inputPath);
      
      // If file is already WebP, just rename and update paths
      if (file.mimetype === 'image/webp' || inputPath.toLowerCase().endsWith('.webp')) {
        const outputPath = path.join(dir, `${originalName}-${Date.now()}.webp`);
        fs.renameSync(inputPath, outputPath);
        
        file.filename = path.basename(outputPath);
        file.path = outputPath;
        file.mimetype = 'image/webp';
        file.originalname = `${originalName}.webp`;
        file.webpPath = `${urlPath}/${file.filename}`;
        
        return next();
      }

      // Convert other formats to WebP
      const outputPath = path.join(dir, `${originalName}-${Date.now()}.webp`);

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
      file.webpPath = `${urlPath}/${file.filename}`;

      return next();
    } catch (error) {
      // Clean up on error
      if (req.files.image[0] && fs.existsSync(req.files.image[0].path)) {
        fs.unlinkSync(req.files.image[0].path);
      }
      return res.status(500).json({ error: 'Error converting image to WebP: ' + error.message });
    }
  }
  
  // No file to process
  next();
};

// Middleware for multiple file uploads
export const convertMultipleToWebP = async (req, res, next) => {
  if (!req.files || (typeof req.files === 'object' && !Array.isArray(req.files) && Object.keys(req.files).length === 0)) {
    return next();
  }

  try {
    // Handle req.files as object (from upload.fields())
    if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
      // Process each field's files
      for (const fieldName in req.files) {
        const files = req.files[fieldName];
        if (Array.isArray(files)) {
          for (const file of files) {
            const inputPath = file.path;
            const originalName = path.parse(file.originalname).name;
            const { dir, urlPath } = getUploadType(inputPath);
            
            // If file is already WebP, just rename and update paths
            if (file.mimetype === 'image/webp' || inputPath.toLowerCase().endsWith('.webp')) {
              const outputPath = path.join(dir, `${originalName}-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`);
              fs.renameSync(inputPath, outputPath);
              
              file.filename = path.basename(outputPath);
              file.path = outputPath;
              file.mimetype = 'image/webp';
              file.originalname = `${originalName}.webp`;
              file.webpPath = `${urlPath}/${file.filename}`;
              continue;
            }

            // Convert other formats to WebP
            const outputPath = path.join(dir, `${originalName}-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`);

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
            file.webpPath = `${urlPath}/${file.filename}`;
          }
        }
      }
    } else if (Array.isArray(req.files)) {
      // Handle req.files as array (from upload.array())
      for (const file of req.files) {
        const inputPath = file.path;
        const originalName = path.parse(file.originalname).name;
        const { dir, urlPath } = getUploadType(inputPath);
        
        // If file is already WebP, just rename and update paths
        if (file.mimetype === 'image/webp' || inputPath.toLowerCase().endsWith('.webp')) {
          const outputPath = path.join(dir, `${originalName}-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`);
          fs.renameSync(inputPath, outputPath);
          
          file.filename = path.basename(outputPath);
          file.path = outputPath;
          file.mimetype = 'image/webp';
          file.originalname = `${originalName}.webp`;
          file.webpPath = `${urlPath}/${file.filename}`;
          continue;
        }

        // Convert other formats to WebP
        const outputPath = path.join(dir, `${originalName}-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`);

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
        file.webpPath = `${urlPath}/${file.filename}`;
      }
    }

    next();
  } catch (error) {
    // Clean up on error
    if (req.files) {
      if (typeof req.files === 'object' && !Array.isArray(req.files)) {
        // Handle object structure
        for (const fieldName in req.files) {
          const files = req.files[fieldName];
          if (Array.isArray(files)) {
            files.forEach(file => {
              if (file && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
              }
            });
          }
        }
      } else if (Array.isArray(req.files)) {
        // Handle array structure
        req.files.forEach(file => {
          if (file && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        });
      }
    }
    return res.status(500).json({ error: 'Error converting images to WebP: ' + error.message });
  }
};

export { upload };

