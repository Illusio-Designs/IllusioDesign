#!/bin/bash

# Frontend FTP Deployment Script
# This script tests FTP connection and uploads a test file

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# FTP Configuration
FTP_HOST="ftp.illusiodesigns.agency"
FTP_USER="Website@illusiodesigns.agency"
FTP_PASS="Rishi@1995"
FTP_PORT="21"
REMOTE_DIR="/"
TEST_FILE="public/Readme.txt"
TEST_REMOTE_NAME="test-upload-$(date +%Y%m%d-%H%M%S).txt"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Frontend FTP Deployment Test Script${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if test file exists
if [ ! -f "$TEST_FILE" ]; then
    echo -e "${YELLOW}⚠️  Test file not found: $TEST_FILE${NC}"
    echo -e "${YELLOW}Creating a test file...${NC}"
    mkdir -p public
    echo "FTP Connection Test File - $(date)" > "$TEST_FILE"
    echo "This is a test file to verify FTP connection." >> "$TEST_FILE"
    echo "Uploaded at: $(date)" >> "$TEST_FILE"
    echo -e "${GREEN}✅ Test file created: $TEST_FILE${NC}"
    echo ""
fi

# Display FTP configuration
echo -e "${BLUE}📋 FTP Configuration:${NC}"
echo "   Host: $FTP_HOST"
echo "   User: $FTP_USER"
echo "   Port: $FTP_PORT"
echo "   Remote Dir: $REMOTE_DIR"
echo "   Test File: $TEST_FILE"
echo ""

# Test FTP connection
echo -e "${YELLOW}🔌 Step 1: Testing FTP connection...${NC}"

# Create FTP connection test script
FTP_TEST_SCRIPT=$(mktemp 2>/dev/null || echo "/tmp/ftp_test_$$.txt")
cat > "$FTP_TEST_SCRIPT" <<EOF
open $FTP_HOST $FTP_PORT
user $FTP_USER $FTP_PASS
pwd
quit
EOF

# Test connection
CONNECTION_OUTPUT=$(ftp -n < "$FTP_TEST_SCRIPT" 2>&1)
CONNECTION_STATUS=$?

if echo "$CONNECTION_OUTPUT" | grep -q "230\|257\|200"; then
    echo -e "${GREEN}✅ FTP connection successful!${NC}"
    echo ""
    
    # Upload test file
    echo -e "${YELLOW}📤 Step 2: Uploading test file...${NC}"
    echo "   Local: $TEST_FILE"
    echo "   Remote: $REMOTE_DIR/$TEST_REMOTE_NAME"
    echo ""
    
    # Create FTP upload script
    FTP_UPLOAD_SCRIPT=$(mktemp 2>/dev/null || echo "/tmp/ftp_upload_$$.txt")
    cat > "$FTP_UPLOAD_SCRIPT" <<FTPEOF
open $FTP_HOST $FTP_PORT
user $FTP_USER $FTP_PASS
binary
cd $REMOTE_DIR
put $TEST_FILE $TEST_REMOTE_NAME
ls -la $TEST_REMOTE_NAME
quit
FTPEOF
    
    # Execute FTP upload
    UPLOAD_OUTPUT=$(ftp -n < "$FTP_UPLOAD_SCRIPT" 2>&1)
    UPLOAD_STATUS=$?
    
    if [ $UPLOAD_STATUS -eq 0 ] && echo "$UPLOAD_OUTPUT" | grep -q "$TEST_REMOTE_NAME\|226"; then
        echo -e "${GREEN}✅ Test file uploaded successfully!${NC}"
        echo ""
        echo -e "${BLUE}📄 Upload details:${NC}"
        echo "$UPLOAD_OUTPUT" | grep -A 2 "$TEST_REMOTE_NAME" | head -3
        echo ""
        echo -e "${GREEN}✅ FTP connection and upload test completed successfully!${NC}"
        echo ""
        echo -e "${YELLOW}📌 Test file location: $REMOTE_DIR/$TEST_REMOTE_NAME${NC}"
        echo -e "${YELLOW}📌 You can verify the file in your FTP client or cPanel.${NC}"
        echo -e "${YELLOW}📌 You can now proceed with full deployment.${NC}"
        
        # Clean up
        rm -f "$FTP_UPLOAD_SCRIPT"
    else
        echo ""
        echo -e "${RED}❌ Failed to upload test file!${NC}"
        echo -e "${RED}Error output:${NC}"
        echo "$UPLOAD_OUTPUT" | tail -5
        rm -f "$FTP_UPLOAD_SCRIPT"
        rm -f "$FTP_TEST_SCRIPT"
        exit 1
    fi
    
    # Clean up test script
    rm -f "$FTP_TEST_SCRIPT"
    
else
    echo ""
    echo -e "${RED}❌ FTP connection test failed!${NC}"
    echo -e "${RED}Error details:${NC}"
    echo "$CONNECTION_OUTPUT" | tail -5
    echo ""
    echo -e "${RED}Please check:${NC}"
    echo "   - FTP server is accessible"
    echo "   - FTP credentials are correct"
    echo "   - Firewall/network settings"
    echo "   - FTP port $FTP_PORT is open"
    rm -f "$FTP_TEST_SCRIPT"
    exit 1
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ All tests completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"

