#!/bin/bash
# TMJ Complete Setup Script
# One-command setup for the entire TMJ deployment system

set -e

echo "🚀 TMJ Complete Deployment Setup"
echo "================================="
echo ""

# Check prerequisites
echo "🔍 Checking prerequisites..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check if GitHub CLI is installed (optional but recommended)
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found"
    GH_AVAILABLE=true
else
    echo "⚠️  GitHub CLI not found (recommended but optional)"
    GH_AVAILABLE=false
fi

echo "✅ Prerequisites check completed"
echo ""

# Install dependencies
echo "📦 Installing project dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Create environment files if they don't exist
echo "🔧 Setting up environment files..."

if [ ! -f ".env.production" ]; then
    echo "⚠️  .env.production not found. Creating template..."
    cat > .env.production << EOF
# TMJ Production Environment Configuration
# Update these values with your actual Supabase and Hostinger credentials

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# Environment Settings
NODE_ENV=production
ENABLE_CONSOLE_LOGS=false

# Hostinger FTP Configuration (for fallback deployment)
FTP_SERVER=ftp.hostinger.com
FTP_USERNAME=your-hostinger-username
FTP_PASSWORD=your-hostinger-password
EOF
    echo "✅ Created .env.production template"
    echo "📝 Please edit .env.production with your actual credentials"
else
    echo "✅ .env.production already exists"
fi

if [ ! -f ".env" ]; then
    cp .env.production .env
    echo "✅ Created .env from .env.production"
else
    echo "✅ .env already exists"
fi

echo ""

# Setup deploy configuration
echo "⚙️  Setting up deployment configuration..."

if [ ! -f "deploy.config" ]; then
    echo "⚠️  deploy.config not found. Please configure it manually:"
    echo "   - Edit deploy.config with your Hostinger details"
    echo "   - Set HOSTINGER_HOST, HOSTINGER_USER, and HOSTINGER_PATH"
else
    echo "✅ deploy.config already exists"
fi

echo ""

# Setup GitHub secrets if GitHub CLI is available
if [ "$GH_AVAILABLE" = true ]; then
    echo "🔐 Setting up GitHub secrets..."
    read -p "Do you want to configure GitHub secrets now? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        ./setup-github-secrets.sh
    else
        echo "ℹ️  You can run './setup-github-secrets.sh' later to configure secrets"
    fi
else
    echo "ℹ️  Install GitHub CLI to auto-configure secrets: brew install gh"
fi

echo ""

# Setup terminal aliases
echo "🖥️  Setting up terminal aliases..."
read -p "Do you want to setup terminal aliases now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    ./setup-terminal.sh
else
    echo "ℹ️  You can run './setup-terminal.sh' later to setup aliases"
fi

echo ""

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p config
mkdir -p logs
mkdir -p backups
echo "✅ Directories created"

echo ""

# Security hardening
echo "🛡️  Running security hardening..."
read -p "Do you want to run production security hardening now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    ./production-hardening.sh
else
    echo "ℹ️  You can run './production-hardening.sh' later to apply security hardening"
fi

echo ""

# Git setup
echo "🔄 Setting up Git configuration..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "⚠️  Not in a Git repository. Initializing..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Already in a Git repository"
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
deploy/
.env

# Environment files
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Backup files
*.backup
*.bak

# Security files
config/supabase.prod.js
env-inject.js
EOF
    echo "✅ Created .gitignore"
else
    echo "✅ .gitignore already exists"
fi

echo ""

# Final verification
echo "🔍 Running final verification..."

if [ -f ".env.production" ] && [ -f "deploy.config" ] && [ -f "deploy-enhanced.sh" ]; then
    echo "✅ Setup verification passed"
else
    echo "❌ Setup verification failed - missing required files"
    exit 1
fi

echo ""
echo "🎉 TMJ setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env.production with your actual Supabase credentials"
echo "2. Edit deploy.config with your Hostinger details"
echo "3. Run './setup-github-secrets.sh' to configure GitHub secrets"
echo "4. Run './setup-terminal.sh' to setup helpful aliases"
echo "5. Test your setup with './deploy-enhanced.sh --dry-run'"
echo ""
echo "🚀 Quick deployment commands:"
echo "  ./deploy-enhanced.sh --method=branch    # Branch deployment"
echo "  ./deploy-enhanced.sh --method=ftp       # FTP deployment"
echo "  ./deploy-enhanced.sh --method=both      # Dual deployment"
echo ""
echo "📚 For help with all commands, run: ./setup-terminal.sh && tmj-help"
