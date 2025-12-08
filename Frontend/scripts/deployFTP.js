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

// Remote directory on FTP server - deploy directly to Website folder in home directory
const remoteDir = '/';

// Directories and files to upload
const uploadPaths = [
  '.next',
  'src', // Required: contains the app directory for Next.js
  'public',
  'package.json',
  'package-lock.json', // Helps ensure correct dependencies
  'next.config.js',
  'jsconfig.json',
  'server.js' // Custom server entry point
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

// Helper function to ensure directory exists on FTP server
// If directory doesn't exist, it will CREATE it
async function ensureRemoteDir(client, dirPath, baseDir) {
  if (!dirPath || dirPath === '' || dirPath === '/') {
    return;
  }
  
  // Normalize path - remove leading/trailing slashes and split
  const normalizedPath = dirPath.replace(/^\/+|\/+$/g, '');
  if (!normalizedPath) {
    return;
  }
  
  const parts = normalizedPath.split('/').filter(part => part.length > 0);
  let currentPath = baseDir === '/' ? '' : baseDir;
  
  // Make sure we start from base directory
  await client.cd(baseDir);
  
  for (const part of parts) {
    const nextPath = currentPath === '' ? `/${part}` : `${currentPath}/${part}`;
    
    let directoryExists = false;
    
    // Step 1: Check if directory exists by trying to cd into it
    try {
      await client.cd(nextPath);
      directoryExists = true;
      currentPath = nextPath;
    } catch (cdError) {
      // Directory doesn't exist - we need to CREATE it
      directoryExists = false;
    }
    
    // Step 2: If directory doesn't exist, CREATE it
    if (!directoryExists) {
      try {
        // Method 1: Try using MKD command directly
        await client.send(`MKD ${nextPath}`);
        // Verify it was created by trying to cd into it
        await client.cd(nextPath);
        currentPath = nextPath;
      } catch (mkdirError) {
        // Method 2: If MKD fails, try ensureDir method
        try {
          await client.ensureDir(nextPath);
          // Verify it was created
          await client.cd(nextPath);
          currentPath = nextPath;
        } catch (ensureError) {
          // Method 3: Check if error is because directory already exists
          // Some FTP servers return 550 for "directory exists"
          const errorMsg = (mkdirError.message || '') + (ensureError.message || '');
          if (errorMsg.includes('550') || errorMsg.includes('exists') || errorMsg.includes('already')) {
            // Directory might have been created by another process, try to access it
            try {
              await client.cd(nextPath);
              currentPath = nextPath;
            } catch (finalError) {
              // If we still can't access it, throw error
              throw new Error(`Cannot create or access directory: ${nextPath}. Error: ${finalError.message}`);
            }
          } else {
            // Real error occurred
            throw new Error(`Failed to create directory: ${nextPath}. Error: ${ensureError.message || mkdirError.message}`);
          }
        }
      }
    }
  }
  
  // Return to base directory after creating all directories
  await client.cd(baseDir);
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
    
    // Change to remote directory - ensure Website folder exists
    try {
      // First, go to root to ensure we're starting from the right place
      await client.cd('/');
      // Try to change to Website directory
      await client.cd(remoteDir);
      console.log(`📁 Changed to directory: ${remoteDir}\n`);
    } catch (error) {
      console.log(`⚠️  Directory ${remoteDir} might not exist, creating...`);
      // Go to root first
      await client.cd('/');
      // Create the Website directory
      await client.ensureDir(remoteDir);
      // Change into it
      await client.cd(remoteDir);
      console.log(`✅ Created and changed to directory: ${remoteDir}\n`);
    }
    
    // Verify we're in the right directory
    const currentDir = await client.pwd();
    console.log(`📍 Current FTP directory: ${currentDir}\n`);
    
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
    
    // Pre-create all required directories to ensure they exist
    console.log('📁 Creating directory structure...\n');
    const directoriesToCreate = new Set();
    for (const file of allFiles) {
      const remoteDirPath = file.remotePath.substring(0, file.remotePath.lastIndexOf('/'));
      if (remoteDirPath) {
        directoriesToCreate.add(remoteDirPath);
      }
    }
    
    // Create all directories
    await client.cd('/');
    await client.cd(remoteDir);
    for (const dirPath of directoriesToCreate) {
      try {
        await ensureRemoteDir(client, dirPath, remoteDir);
      } catch (error) {
        console.log(`⚠️  Warning: Could not create directory ${dirPath}: ${error.message}`);
      }
    }
    console.log(`✅ Created ${directoriesToCreate.size} directories\n`);
    
    // Upload files
    console.log('📤 Starting upload process...\n');
    let uploaded = 0;
    let failed = 0;
    const failedFiles = [];
    
    for (const file of allFiles) {
      try {
        // Ensure parent directory exists before uploading
        const remoteDirPath = file.remotePath.substring(0, file.remotePath.lastIndexOf('/'));
        if (remoteDirPath) {
          // Create the full directory path (in case it wasn't created above)
          await ensureRemoteDir(client, remoteDirPath, remoteDir);
        }
        
        // Upload file
        if (uploaded % 50 === 0 || uploaded < 10) {
          console.log(`⬆️  Uploading (${uploaded + 1}/${allFiles.length}): ${file.remotePath}`);
        }
        
        // Retry logic for connection issues
        let retries = 3;
        while (retries > 0) {
          try {
            // Always ensure we're in the Website directory before uploading
            await client.cd('/');
            await client.cd(remoteDir);
            
            // Upload the file - remotePath is relative to current directory (Website)
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
            // Reconnect if connection was closed or directory error
            if (error.message.includes('closed') || error.message.includes('FIN') || error.message.includes('553')) {
              console.log(`   Reconnecting... (${retries} retries left)`);
              await new Promise(resolve => setTimeout(resolve, 1000));
              await client.access(ftpConfig);
              await client.cd(remoteDir);
              
              // If it was a directory error, try creating the directory again
              if (error.message.includes('553') && remoteDirPath) {
                try {
                  await ensureRemoteDir(client, remoteDirPath, remoteDir);
                } catch (dirError) {
                  // Continue anyway
                }
              }
            } else {
              throw error;
            }
          }
        }
      } catch (error) {
        console.error(`❌ Failed to upload: ${file.remotePath} - ${error.message}`);
        failed++;
        failedFiles.push({ path: file.remotePath, error: error.message });
      }
    }
    
    console.log(`\n✅ Upload completed!`);
    console.log(`   Uploaded: ${uploaded} files`);
    if (failed > 0) {
      console.log(`   Failed: ${failed} files`);
      console.log(`\n⚠️  Failed files:`);
      failedFiles.slice(0, 10).forEach(f => {
        console.log(`   - ${f.path}: ${f.error}`);
      });
      if (failedFiles.length > 10) {
        console.log(`   ... and ${failedFiles.length - 10} more`);
      }
    }
    
    // Verify critical directories exist
    console.log(`\n🔍 Verifying critical directories...`);
    try {
      await client.cd('/');
      await client.cd(remoteDir);
      
      const dirsToCheck = ['src', 'src/app', '.next', 'public'];
      for (const dir of dirsToCheck) {
        try {
          // Try to list the directory to verify it exists
          await client.list(dir);
          console.log(`   ✅ ${dir} exists`);
        } catch (e) {
          // If list fails, try to cd into it
          try {
            await client.cd(dir);
            await client.cd('..');
            console.log(`   ✅ ${dir} exists`);
          } catch (e2) {
            console.log(`   ❌ ${dir} is missing!`);
          }
        }
      }
      
      // Verify critical files exist
      console.log(`\n🔍 Verifying critical files...`);
      const filesToCheck = [
        'server.js',
        'package.json',
        'next.config.js',
        '.next/BUILD_ID',
        '.next/build-manifest.json'
      ];
      
      for (const file of filesToCheck) {
        try {
          await client.size(file);
          console.log(`   ✅ ${file} exists`);
        } catch (e) {
          console.log(`   ❌ ${file} is missing!`);
        }
      }
    } catch (error) {
      console.log(`   ⚠️  Could not verify: ${error.message}`);
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
