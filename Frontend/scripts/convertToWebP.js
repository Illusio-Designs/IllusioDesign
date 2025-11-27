import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, '../public');

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
  let deletedCount = 0;

  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);

    if (file.isDirectory()) {
      // Recursively process subdirectories
      const result = await convertImagesInDirectory(fullPath);
      convertedCount += result.converted;
      deletedCount += result.deleted;
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
            // Delete original file after successful conversion
            try {
              fs.unlinkSync(fullPath);
              console.log(`  → Deleted original: ${file.name}`);
              deletedCount++;
            } catch (deleteError) {
              console.warn(`  ⚠ Could not delete ${file.name}:`, deleteError.message);
            }
          }
        } else {
          // WebP already exists, delete the original non-WebP file
          try {
            fs.unlinkSync(fullPath);
            console.log(`✓ Deleted original (WebP exists): ${file.name}`);
            deletedCount++;
          } catch (deleteError) {
            console.log(`⊘ Skipped: ${file.name} (WebP exists, couldn't delete original)`);
          }
        }
      }
    }
  }

  return { converted: convertedCount, deleted: deletedCount };
}

// Main execution
async function main() {
  console.log('Converting images in frontend/public to WebP format...\n');
  console.log('Scanning:', publicPath);
  console.log('');

  if (!fs.existsSync(publicPath)) {
    console.error(`Error: Public directory not found at ${publicPath}`);
    process.exit(1);
  }

  const result = await convertImagesInDirectory(publicPath);

  console.log(`\n✓ Conversion complete!`);
  console.log(`  - Converted to WebP: ${result.converted} image(s)`);
  console.log(`  - Deleted originals: ${result.deleted} file(s)`);
  
  if (result.converted === 0 && result.deleted === 0) {
    console.log(`\n  No images found to convert. All images are already in WebP format!`);
  }
}

main().catch(console.error);

