import ftp from 'basic-ftp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FTP Configuration
const ftpConfig = {
  host: 'ftp.illusiodesigns.agency',
  user: 'Website@illusiodesigns.agency',
  password: 'Rishi@1995',
  port: 21,
  secure: false,
  secureOptions: {
    rejectUnauthorized: false
  }
};

// Remote directory on FTP server (usually public_html or www)
const remoteDir = '/public_html';

// Directories and files to upload
const uploadPaths = [
  '.next',
  'public',
  'package.json',
  'next.config.js',
  'jsconfig.json'
];

// Files to exclude
const excludePatterns = [
  'node_modules',
  '.git',
  '.next/cache',
  '.next/trace',
  '.next/types',
  '.env',
  '.env.local',
  '.env.production'
];

function shouldExclude(filePath) {
  // Normalize path separators
  const normalizedPath = filePath.replace(/\\/g, '/');
  return excludePatterns.some(pattern => normalizedPath.includes(pattern));
}

// Collect all files to upload
function collectFiles(dir, baseDir, fileList = []) {
  const fullPath = path.join(baseDir, dir);
  const stats = fs.statSync(fullPath);
  
  if (stats.isDirectory()) {
    const items = fs.readdirSync(fullPath);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const fullItemPath = path.join(baseDir, itemPath);
      
      if (shouldExclude(fullItemPath)) {
        continue;
      }
      
      collectFiles(itemPath, baseDir, fileList);
    }
  } else {
    fileList.push({
      localPath: fullPath,
      remotePath: dir.replace(/\\/g, '/')
    });
  }
  
  return fileList;
}

async function deployToFTP() {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  
  const projectRoot = path.join(__dirname, '..');
  
  try {
    console.log('📦 Building Next.js application...');
    process.chdir(projectRoot);
    
    // Build the Next.js app
    try {
      execSync('npm run build', { stdio: 'inherit', cwd: projectRoot });
      console.log('✅ Build completed successfully!\n');
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
    
    console.log('🔌 Connecting to FTP server...');
    console.log(`Host: ${ftpConfig.host}`);
    console.log(`User: ${ftpConfig.user}`);
    console.log(`Remote Directory: ${remoteDir}\n`);
    
    await client.access(ftpConfig);
    console.log('✅ FTP connection successful!\n');
    
    // Change to remote directory
    try {
      await client.cd(remoteDir);
      console.log(`📁 Changed to directory: ${remoteDir}\n`);
    } catch (error) {
      console.log(`⚠️  Directory ${remoteDir} might not exist, creating...`);
      await client.ensureDir(remoteDir);
      await client.cd(remoteDir);
      console.log(`✅ Created and changed to directory: ${remoteDir}\n`);
    }
    
    // Collect all files to upload
    console.log('📋 Collecting files to upload...\n');
    const allFiles = [];
    
    for (const uploadPath of uploadPaths) {
      const localPath = path.join(projectRoot, uploadPath);
      
      if (!fs.existsSync(localPath)) {
        console.log(`⚠️  Skipping (not found): ${uploadPath}`);
        continue;
      }
      
      const stats = fs.statSync(localPath);
      if (stats.isDirectory()) {
        collectFiles(uploadPath, projectRoot, allFiles);
      } else {
        allFiles.push({
          localPath: localPath,
          remotePath: uploadPath.replace(/\\/g, '/')
        });
      }
    }
    
    console.log(`📦 Found ${allFiles.length} files to upload\n`);
    
    // Upload files
    console.log('📤 Starting upload process...\n');
    let uploaded = 0;
    let failed = 0;
    
    for (const file of allFiles) {
      try {
        // Ensure parent directory exists
        const remoteDirPath = file.remotePath.substring(0, file.remotePath.lastIndexOf('/'));
        if (remoteDirPath) {
          // Create directory path incrementally
          const parts = remoteDirPath.split('/');
          let currentPath = '';
          for (const part of parts) {
            currentPath = currentPath ? `${currentPath}/${part}` : part;
            try {
              await client.ensureDir(currentPath);
            } catch (e) {
              // Directory might already exist
            }
          }
        }
        
        // Upload file
        if (uploaded % 50 === 0 || uploaded < 10) {
          console.log(`⬆️  Uploading (${uploaded + 1}/${allFiles.length}): ${path.basename(file.localPath)}`);
        }
        
        // Retry logic for connection issues
        let retries = 3;
        while (retries > 0) {
          try {
            await client.uploadFrom(file.localPath, file.remotePath);
            uploaded++;
            // Small delay to prevent overwhelming the server
            if (uploaded % 10 === 0) {
              await new Promise(resolve => setTimeout(resolve, 100));
            }
            break;
          } catch (error) {
            retries--;
            if (retries === 0) {
              throw error;
            }
            // Reconnect if connection was closed
            if (error.message.includes('closed') || error.message.includes('FIN')) {
              console.log(`   Reconnecting... (${retries} retries left)`);
              await new Promise(resolve => setTimeout(resolve, 1000));
              await client.access(ftpConfig);
              await client.cd(remoteDir);
            } else {
              throw error;
            }
          }
        }
      } catch (error) {
        console.error(`❌ Failed to upload: ${file.remotePath} - ${error.message}`);
        failed++;
      }
    }
    
    console.log(`\n✅ Upload completed!`);
    console.log(`   Uploaded: ${uploaded} files`);
    if (failed > 0) {
      console.log(`   Failed: ${failed} files`);
    }
    
    console.log(`\n📌 Your frontend build has been uploaded to: ${remoteDir}`);
    console.log('📌 Please check cPanel to verify the files are there.');
    
  } catch (error) {
    console.error('\n❌ Deployment failed:');
    console.error(`Error: ${error.message}`);
    if (error.code) {
      console.error(`Error code: ${error.code}`);
    }
    if (error.stack) {
      console.error(`Stack trace: ${error.stack}`);
    }
    process.exit(1);
  } finally {
    client.close();
    console.log('\n🔌 FTP connection closed');
  }
}

// Run deployment
deployToFTP().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
