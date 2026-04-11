#!/bin/bash

# Enhanced TMJ Terminal Deployment Script with Dual Deployment Support
# Usage: ./deploy-enhanced.sh [--dry-run] [--force] [--method=branch|ftp|both]

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
DEPLOY_METHOD="both"
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
        --method=*)
            DEPLOY_METHOD="${arg#*=}"
            shift
            ;;
    esac
done

# Configuration
REMOTE_HOST="${HOSTINGER_USER}@${HOSTINGER_HOST}"
REMOTE_PATH="${HOSTINGER_PATH}"
LOCAL_BUILD_DIR="./deploy"

echo "🚀 Starting TMJ Enhanced Deployment..."
echo "📍 Target: $REMOTE_HOST:$REMOTE_PATH"
echo "🔧 Method: $DEPLOY_METHOD"

# Check if we're on the right branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "$DEPLOY_BRANCH" ] && [ "$FORCE" != true ]; then
    echo "❌ Error: You're on '$CURRENT_BRANCH' but deployment is configured for '$DEPLOY_BRANCH'"
    echo "Use --force to deploy anyway or switch to $DEPLOY_BRANCH branch"
    exit 1
fi

# Prepare deployment with environment injection
echo "🔧 Preparing deployment with environment injection..."
if [ "$DRY_RUN" != true ]; then
    ./deploy-preparation.sh
else
    echo "🔍 DRY RUN: Would run './deploy-preparation.sh'"
fi

# Backup before deployment (if enabled)
if [ "$BACKUP_BEFORE_DEPLOY" = true ]; then
    echo "💾 Creating backup..."
    BACKUP_DIR="${REMOTE_PATH}_backup_$(date +%Y%m%d_%H%M%S)"
    if [ "$DRY_RUN" != true ]; then
        ssh "$REMOTE_HOST" "cp -r $REMOTE_PATH $BACKUP_DIR" || echo "⚠️  Backup failed (continuing anyway)"
    fi
fi

# Branch-based deployment (Primary method)
if [ "$DEPLOY_METHOD" = "branch" ] || [ "$DEPLOY_METHOD" = "both" ]; then
    echo "🌿 Deploying to hostinger-build branch..."
    if [ "$DRY_RUN" != true ]; then
        # Add deploy directory to git
        git add deploy/
        git commit -m "Deploy production build for Hostinger - $(date)" || echo "ℹ️ No changes to commit"
        
        # Push to hostinger-build branch
        git subtree push --prefix deploy origin hostinger-build || {
            echo "🔄 Creating hostinger-build branch..."
            git checkout -b hostinger-build
            git add deploy/
            git commit -m "Initial deployment for Hostinger"
            git push origin hostinger-build
            git checkout "$CURRENT_BRANCH"
        }
        echo "✅ Branch deployment completed"
    else
        echo "🔍 DRY RUN: Would deploy to hostinger-build branch"
    fi
fi

# FTP deployment (Fallback method)
if [ "$DEPLOY_METHOD" = "ftp" ] || [ "$DEPLOY_METHOD" = "both" ]; then
    echo "� Deploying via FTP..."
    if [ "$DRY_RUN" != true ]; then
        # Create remote directory structure
        ssh "$REMOTE_HOST" "mkdir -p $REMOTE_PATH"
        
        # Upload build files
        rsync -avz --delete "$LOCAL_BUILD_DIR/" "$REMOTE_HOST:$REMOTE_PATH/"
        
        # Set correct permissions
        ssh "$REMOTE_HOST" "chmod 755 $REMOTE_PATH && find $REMOTE_PATH -type f -exec chmod 644 {} \;"
        echo "✅ FTP deployment completed"
    else
        echo "🔍 DRY RUN: Would deploy via FTP to $REMOTE_HOST:$REMOTE_PATH"
    fi
fi

# Clean up
if [ "$DRY_RUN" != true ]; then
    git reset HEAD deploy/ 2>/dev/null || true
fi

echo "✅ Deployment completed successfully!"
if [ "$DRY_RUN" != true ]; then
    echo "🌐 Your website is now live at: https://$HOSTINGER_HOST"
    echo "📊 Deployment method used: $DEPLOY_METHOD"
else
    echo "🔍 DRY RUN completed - no actual deployment performed"
fi
