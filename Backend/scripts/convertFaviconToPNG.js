import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webpPath = path.join(__dirname, '../../frontend/public/images/IllusioDesignLogoicon.webp');
const pngPath = path.join(__dirname, '../../frontend/public/favicon.png');
const icoPath = path.join(__dirname, '../../frontend/public/favicon.ico');

async function convertFavicon() {
  try {
    // Convert WebP to PNG (32x32 for favicon)
    await sharp(webpPath)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(pngPath);
    
    console.log('✓ Created favicon.png (32x32)');

    // Also create a 16x16 version
    const png16Path = path.join(__dirname, '../../frontend/public/favicon-16x16.png');
    await sharp(webpPath)
      .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(png16Path);
    
    console.log('✓ Created favicon-16x16.png (16x16)');

    // Create ico file (multi-size ICO)
    const sizes = [16, 32, 48];
    const buffers = await Promise.all(
      sizes.map(size =>
        sharp(webpPath)
          .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
          .png()
          .toBuffer()
      )
    );

    // For ICO, we'll use PNG as ICO (browsers accept PNG with .ico extension)
    await sharp(webpPath)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(icoPath);
    
    console.log('✓ Created favicon.ico (32x32)');
    console.log('\n✓ Favicon conversion complete!');
  } catch (error) {
    console.error('Error converting favicon:', error.message);
    process.exit(1);
  }
}

convertFavicon();

