#!/bin/bash

# TMJ Terminal Deployment Script
# Usage: ./deploy.sh [host]

set -e

# Configuration
REMOTE_HOST="hostinger"
REMOTE_PATH="/home/your-username/public_html"
LOCAL_BUILD_DIR="./dist"

echo "🚀 Starting TMJ Deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Create .htaccess on remote
echo "⚙️  Setting up .htaccess..."
cat > /tmp/htaccess << 'EOL'
# Hostinger .htaccess for React SPA
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/jpg "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/ico "access plus 1 month"
  ExpiresByType image/svg "access plus 1 month"
</IfModule>
EOL

# Deploy files
echo "📤 Deploying files to $REMOTE_HOST..."

# Create remote directory structure
ssh "$REMOTE_HOST" "mkdir -p $REMOTE_PATH"

# Upload build files
rsync -avz --delete "$LOCAL_BUILD_DIR/" "$REMOTE_HOST:$REMOTE_PATH/"

# Upload .htaccess
scp /tmp/htaccess "$REMOTE_HOST:$REMOTE_PATH/.htaccess"

# Set correct permissions
ssh "$REMOTE_HOST" "chmod 755 $REMOTE_PATH && chmod 644 $REMOTE_PATH/.htaccess && find $REMOTE_PATH -type f -exec chmod 644 {} \;"

# Clean up
rm -f /tmp/htaccess

echo "✅ Deployment completed successfully!"
echo "🌐 Your website is now live at: https://your-domain.com"
