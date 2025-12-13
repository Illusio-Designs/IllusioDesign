import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload single image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    res.json({
      message: 'Image uploaded and converted to WebP successfully',
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.webpPath || `/uploads/images/${req.file.filename}`,
        url: `${req.protocol}://${req.get('host')}${req.file.webpPath || `/uploads/images/${req.file.filename}`}`
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload multiple images
export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.webpPath || `/uploads/images/${file.filename}`,
      url: `${req.protocol}://${req.get('host')}${file.webpPath || `/uploads/images/${file.filename}`}`
    }));

    res.json({
      message: 'Images uploaded and converted to WebP successfully',
      data: uploadedFiles,
      count: uploadedFiles.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const imagesDir = path.join(__dirname, '../../uploads/images');
    const filePath = path.join(imagesDir, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Delete file
    fs.unlinkSync(filePath);

    res.json({
      message: 'Image deleted successfully',
      filename: filename
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all images
export const getAllImages = async (req, res) => {
  try {
    const imagesDir = path.join(__dirname, '../../uploads/images');
    
    if (!fs.existsSync(imagesDir)) {
      return res.json({ data: [], count: 0 });
    }

    const files = fs.readdirSync(imagesDir);
    const images = files
      .filter(file => file.toLowerCase().endsWith('.webp'))
      .map(file => {
        const filePath = path.join(imagesDir, file);
        const stats = fs.statSync(filePath);
        return {
          filename: file,
          size: stats.size,
          createdAt: stats.birthtime,
          path: `/uploads/images/${file}`,
          url: `${req.protocol}://${req.get('host')}/uploads/images/${file}`
        };
      });

    res.json({
      data: images,
      count: images.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

