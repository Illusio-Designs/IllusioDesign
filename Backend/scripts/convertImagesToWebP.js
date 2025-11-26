import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPublicPath = path.join(__dirname, '../../frontend/public');

// Function to convert image to WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    console.log(`✓ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Error converting ${inputPath}:`, error.message);
    return false;
  }
}

// Function to recursively find and convert images
async function convertImagesInDirectory(dirPath) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  let convertedCount = 0;

  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);

    if (file.isDirectory()) {
      // Recursively process subdirectories
      convertedCount += await convertImagesInDirectory(fullPath);
    } else if (file.isFile()) {
      // Check if it's an image file that needs conversion
      const ext = path.extname(file.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff'].includes(ext)) {
        const nameWithoutExt = path.parse(file.name).name;
        const webpPath = path.join(dirPath, `${nameWithoutExt}.webp`);

        // Only convert if WebP doesn't already exist
        if (!fs.existsSync(webpPath)) {
          const success = await convertToWebP(fullPath, webpPath);
          if (success) {
            convertedCount++;
          }
        } else {
          console.log(`⊘ Skipped (WebP exists): ${file.name}`);
        }
      }
    }
  }

  return convertedCount;
}

// Main execution
async function main() {
  console.log('Starting image conversion to WebP...\n');

  if (!fs.existsSync(frontendPublicPath)) {
    console.error(`Error: Frontend public directory not found at ${frontendPublicPath}`);
    process.exit(1);
  }

  const convertedCount = await convertImagesInDirectory(frontendPublicPath);

  console.log(`\n✓ Conversion complete! Converted ${convertedCount} image(s) to WebP format.`);
}

main().catch(console.error);

