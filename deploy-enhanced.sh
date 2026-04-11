#!/bin/bash

# Enhanced TMJ Terminal Deployment Script with Config Support
# Usage: ./deploy-enhanced.sh [--dry-run] [--force]

set -e

# Load configuration
if [ -f "deploy.config" ]; then
    source deploy.config
else
    echo "❌ Error: deploy.config not found!"
    echo "Please create deploy.config with your Hostinger settings."
    exit 1
fi

# Parse arguments
DRY_RUN=false
FORCE=false
for arg in "$@"; do
    case $arg in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --force)
            FORCE=true
            shift
            ;;
    esac
done

# Configuration
REMOTE_HOST="${HOSTINGER_USER}@${HOSTINGER_HOST}"
REMOTE_PATH="${HOSTINGER_PATH}"
LOCAL_BUILD_DIR="./dist"

echo "🚀 Starting TMJ Enhanced Deployment..."
echo "📍 Target: $REMOTE_HOST:$REMOTE_PATH"

# Check if we're on the right branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "$DEPLOY_BRANCH" ] && [ "$FORCE" != true ]; then
    echo "❌ Error: You're on '$CURRENT_BRANCH' but deployment is configured for '$DEPLOY_BRANCH'"
    echo "Use --force to deploy anyway or switch to $DEPLOY_BRANCH branch"
    exit 1
fi

# Backup before deployment (if enabled)
if [ "$BACKUP_BEFORE_DEPLOY" = true ]; then
    echo "💾 Creating backup..."
    BACKUP_DIR="${REMOTE_PATH}_backup_$(date +%Y%m%d_%H%M%S)"
    if [ "$DRY_RUN" != true ]; then
        ssh "$REMOTE_HOST" "cp -r $REMOTE_PATH $BACKUP_DIR" || echo "⚠️  Backup failed (continuing anyway)"
    fi
fi

# Build the project
echo "📦 Building project..."
if [ "$DRY_RUN" != true ]; then
    npm run build
else
    echo "🔍 DRY RUN: Would run 'npm run build'"
fi

# Create .htaccess
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

# Security headers
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options nosniff
  Header always set X-Frame-Options DENY
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
EOL

# Deploy files
echo "📤 Deploying files..."
if [ "$DRY_RUN" != true ]; then
    # Create remote directory structure
    ssh "$REMOTE_HOST" "mkdir -p $REMOTE_PATH"
    
    # Upload build files
    rsync -avz --delete "$LOCAL_BUILD_DIR/" "$REMOTE_HOST:$REMOTE_PATH/"
    
    # Upload .htaccess
    scp /tmp/htaccess "$REMOTE_HOST:$REMOTE_PATH/.htaccess"
    
    # Set correct permissions
    ssh "$REMOTE_HOST" "chmod 755 $REMOTE_PATH && chmod 644 $REMOTE_PATH/.htaccess && find $REMOTE_PATH -type f -exec chmod 644 {} \;"
else
    echo "🔍 DRY RUN: Would deploy files to $REMOTE_HOST:$REMOTE_PATH"
fi

# Clean up
rm -f /tmp/htaccess

echo "✅ Deployment completed successfully!"
if [ "$DRY_RUN" != true ]; then
    echo "🌐 Your website is now live at: https://$HOSTINGER_HOST"
else
    echo "🔍 DRY RUN completed - no actual deployment performed"
fi
