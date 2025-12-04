import ftp from 'basic-ftp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FTP Configuration
const ftpConfig = {
  host: 'ftp.illusiodesigns.agency',
  user: 'Riya@illusiodesigns.agency',
  password: 'Rishi@1995',
  port: 21,
  secure: false,
  secureOptions: {
    rejectUnauthorized: false
  },
  passive: true
};

const REMOTE_DIR = '/';
const STAGING_DIR = path.join(__dirname, 'build');
const LOCAL_SOURCE_DIR = __dirname;

// Cleanup function
function cleanup() {
  if (fs.existsSync(STAGING_DIR)) {
    console.log('--- Cleaning up temporary files ---');
    fs.rmSync(STAGING_DIR, { recursive: true, force: true });
    console.log('Cleanup done.');
  }
}

// Register cleanup on exit
process.on('exit', cleanup);
process.on('SIGINT', () => {
  cleanup();
  process.exit(0);
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  cleanup();
  process.exit(1);
});

// Excluded patterns - files/folders NOT to deploy
const excludePatterns = [
  // Dependencies and build artifacts
  'node_modules',
  'build',
  'package-lock.json',
  
  // Version control
  '.git',
  
  // Environment and config files
  '.env',
  '.env.local',
  '.env.development',
  '.env.production',
  '.env.test',
  
  // Uploads and user data
  'uploads',
  
  // Logs
  '*.log',
  
  // IDE and OS files
  '.vscode',
  '.idea',
  '.DS_Store',
  'Thumbs.db',
  
  // Test and verification files
  'test-ftp.js',
  'verify-deployment.js',
  'pre-deploy-check.js',
  'check-directories.js',
  'check-server-files.sh',
  
  // Setup and fix scripts
  'deploy-setup.sh',
  'server-setup.sh',
  'SERVER_FIX.sh',
  'SERVER_VERIFICATION.sh',
  'fix-case-issue.sh',
  
  // Documentation files
  'README.md',
  'DEPLOYMENT_COMPLETE.md',
  'DEPLOYMENT_INSTRUCTIONS.md',
  'FIX_CASE_ISSUE.md',
  'IMMEDIATE_FIX.md',
  'POST_DEPLOYMENT_CHECKLIST.md',
  'QUICK_FIX.md',
  'SOLUTION.md',
  
  // Deployment scripts (don't deploy the deployment scripts themselves)
  'deploy.js',
  'deploy.sh'
];

function shouldExclude(filePath) {
  const normalizedPath = filePath.replace(/\\/g, '/');
  const fileName = path.basename(normalizedPath);
  const dirName = path.dirname(normalizedPath).replace(/\\/g, '/');
  
  return excludePatterns.some(pattern => {
    // Handle wildcard patterns
    if (pattern.includes('*')) {
      // Convert wildcard pattern to regex
      const regexPattern = pattern
        .replace(/\*/g, '.*')
        .replace(/\./g, '\\.');
      const regex = new RegExp(`^${regexPattern}$`, 'i');
      return regex.test(fileName) || regex.test(normalizedPath);
    }
    // Check if pattern matches file name or path
    return normalizedPath.includes(pattern) || 
           fileName.toLowerCase() === pattern.toLowerCase() ||
           normalizedPath.endsWith('/' + pattern);
  });
}

// Collect files to upload
function collectFiles(dir, baseDir, fileList = []) {
  const fullPath = path.join(baseDir, dir);
  
  if (!fs.existsSync(fullPath)) {
    return fileList;
  }
  
  const stats = fs.statSync(fullPath);
  
  if (stats.isDirectory()) {
    const entries = fs.readdirSync(fullPath);
    for (const entry of entries) {
      const entryPath = path.join(dir, entry);
      const fullEntryPath = path.join(baseDir, entryPath);
      
      if (!shouldExclude(entryPath)) {
        collectFiles(entryPath, baseDir, fileList);
      }
    }
  } else {
    if (!shouldExclude(dir)) {
      fileList.push({
        localPath: fullPath,
        remotePath: dir.replace(/\\/g, '/')
      });
    }
  }
  
  return fileList;
}

async function deployToFTP() {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  
  try {
    console.log('--- 2. Preparing Staging Area ---');
    
    // Clean up old staging directory
    if (fs.existsSync(STAGING_DIR)) {
      fs.rmSync(STAGING_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(STAGING_DIR, { recursive: true });
    
    console.log('Syncing files to staging area...');
    
    // Collect all files
    const allFiles = [];
    const entries = fs.readdirSync(LOCAL_SOURCE_DIR);
    
    for (const entry of entries) {
      const entryPath = entry;
      if (!shouldExclude(entryPath)) {
        collectFiles(entryPath, LOCAL_SOURCE_DIR, allFiles);
      }
    }
    
    // Copy files to staging directory
    for (const file of allFiles) {
      const stagingPath = path.join(STAGING_DIR, file.remotePath);
      const stagingDir = path.dirname(stagingPath);
      
      if (!fs.existsSync(stagingDir)) {
        fs.mkdirSync(stagingDir, { recursive: true });
      }
      
      fs.copyFileSync(file.localPath, stagingPath);
    }
    
    console.log(`Prepared ${allFiles.length} files for upload.`);
    console.log('--- 3. Starting FTP Upload ---');
    
    console.log('Connecting to FTP server...');
    console.log(`Host: ${ftpConfig.host}`);
    console.log(`User: ${ftpConfig.user}`);
    client.ftp.verbose = true;
    await client.access(ftpConfig);
    client.ftp.verbose = false;
    console.log('Connected. Starting Sync...');
    
    // Change to remote directory (root)
    const currentDir = await client.pwd();
    console.log(`Current FTP directory: ${currentDir}`);
    
    // Upload files
    let uploaded = 0;
    let failed = 0;
    
    for (const file of allFiles) {
      try {
        const localPath = path.join(STAGING_DIR, file.remotePath);
        const remotePath = file.remotePath;
        
        // Ensure parent directory exists by creating it recursively
        const lastSlashIndex = remotePath.lastIndexOf('/');
        if (lastSlashIndex > 0) {
          const remoteDirPath = remotePath.substring(0, lastSlashIndex);
          // Create directory path incrementally from root
          const parts = remoteDirPath.split('/').filter(p => p);
          let currentPath = '';
          for (const part of parts) {
            currentPath = currentPath ? `${currentPath}/${part}` : `/${part}`;
            try {
              await client.ensureDir(currentPath);
            } catch (dirError) {
              // Directory might already exist, that's fine
            }
          }
        }
        
        // Upload file
        if (uploaded % 50 === 0 || uploaded < 10) {
          console.log(`Uploading (${uploaded + 1}/${allFiles.length}): ${path.basename(remotePath)}`);
        }
        
        // Upload to the full path from root
        const fullRemotePath = remotePath.startsWith('/') ? remotePath : `/${remotePath}`;
        await client.uploadFrom(localPath, fullRemotePath);
        uploaded++;
        
        if (uploaded % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`Failed to upload ${file.remotePath}:`, error.message);
        failed++;
      }
    }
    
    console.log(`\n--- 4. Deployment Finished Successfully! ---`);
    console.log(`Uploaded: ${uploaded} files`);
    if (failed > 0) {
      console.log(`Failed: ${failed} files`);
    }
    
  } catch (error) {
    console.error('\n❌ Deployment failed:');
    console.error(`Error: ${error.message}`);
    if (error.code) {
      console.error(`Error code: ${error.code}`);
    }
    throw error;
  } finally {
    client.close();
    console.log('\nFTP connection closed.');
  }
}

// Run deployment
deployToFTP()
  .then(() => {
    cleanup();
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    cleanup();
    process.exit(1);
  });

