#!/bin/bash

# --- Configuration ---
FTP_SERVER="ftp.illusiodesigns.agency"
FTP_USER="Riya@illusiodesigns.agency"
FTP_PASS="Rishi@1995"
REMOTE_DIR="/"
LOCAL_SOURCE_DIR="."
STAGING_DIR="build"

# # --- 1. The Safety Net (Trap) ---
# # This function will run automatically when the script exits, crashes, or is cancelled.
cleanup() {
    if [ -d "$STAGING_DIR" ]; then
        echo "--- Cleaning up temporary files ---"
        rm -rf "$STAGING_DIR"
        echo "Cleanup done."
    fi
}

# # Register the trap: Run 'cleanup' on EXIT, SIGINT (Ctrl+C), or ERR (Error)
trap cleanup EXIT

# Stop the script immediately if any command returns an error
set -e

echo "--- 2. Preparing Staging Area ---"

# # Ensure we start fresh
if [ -d "$STAGING_DIR" ]; then
    rm -rf "$STAGING_DIR"
fi
mkdir "$STAGING_DIR"

if [ ! -d "$LOCAL_SOURCE_DIR" ]; then
    echo "Error: Source directory '$LOCAL_SOURCE_DIR' not found."
    exit 1
fi

echo "Syncing files to staging area..."

# Copy all files first, then remove excluded items
cp -r "$LOCAL_SOURCE_DIR"/* "$STAGING_DIR/" 2>/dev/null || true
cp -r "$LOCAL_SOURCE_DIR"/.[!.]* "$STAGING_DIR/" 2>/dev/null || true

# Remove excluded directories and files
rm -rf "$STAGING_DIR"/node_modules
rm -rf "$STAGING_DIR"/.git
rm -rf "$STAGING_DIR"/uploads
rm -rf "$STAGING_DIR"/build
rm -f "$STAGING_DIR"/package-lock.json
rm -f "$STAGING_DIR"/.env*
rm -f "$STAGING_DIR"/*.log
rm -rf "$STAGING_DIR"/.vscode
rm -rf "$STAGING_DIR"/.idea

echo "--- 3. Starting LFTP Mirror Upload ---"

# lftp command
lftp -c "
set ftp:ssl-allow yes;
set ssl:verify-certificate no;
open -u '$FTP_USER','$FTP_PASS' '$FTP_SERVER';
echo 'Connected. Starting Sync...';
mirror --reverse --delete --verbose --parallel=10 '$STAGING_DIR' '$REMOTE_DIR';
bye;
"

echo "--- 4. Deployment Finished Successfully! ---"
# The 'trap' function will now run automatically here.