#!/bin/bash

# Enhanced TMJ Terminal Setup Script
# Configures comprehensive terminal aliases and functions for TMJ deployment

echo "🔧 Setting up enhanced TMJ deployment aliases..."

# Load configuration to get actual host values
if [ -f "deploy.config" ]; then
    source deploy.config
    REMOTE_HOST="${HOSTINGER_USER}@${HOSTINGER_HOST}"
    REMOTE_PATH="${HOSTINGER_PATH}"
else
    echo "⚠️  deploy.config not found, using placeholder values"
    REMOTE_HOST="your-hostinger-username@your-domain.com"
    REMOTE_PATH="/home/your-username/public_html"
fi

# Add to .zshrc or .bashrc
SHELL_RC="$HOME/.zshrc"
if [ ! -f "$SHELL_RC" ]; then
    SHELL_RC="$HOME/.bashrc"
fi

cat >> "$SHELL_RC" << EOF

# TMJ Enhanced Deployment Aliases
# =================================

# Basic deployment commands
alias tmj-deploy="./deploy-enhanced.sh"
alias tmj-deploy-dry="./deploy-enhanced.sh --dry-run"
alias tmj-deploy-branch="./deploy-enhanced.sh --method=branch"
alias tmj-deploy-ftp="./deploy-enhanced.sh --method=ftp"
alias tmj-deploy-force="./deploy-enhanced.sh --force"

# Environment and setup
alias tmj-setup-secrets="./setup-github-secrets.sh"
alias tmj-setup-env="cp .env.production .env"
alias tmj-prepare="./deploy-preparation.sh"
alias tmj-harden="./production-hardening.sh"
alias tmj-verify="./verify-production.sh"

# Git workflow
alias tmj-push-deploy="git push origin main && ./deploy-enhanced.sh"
alias tmj-sync="git pull origin main && ./deploy-enhanced.sh"
alias tmj-status="git status"

# Server management
alias tmj-connect="ssh $REMOTE_HOST"
alias tmj-server-status="ssh -q $REMOTE_HOST 'uptime && df -h'"
alias tmj-logs="ssh -q $REMOTE_HOST 'tail -f /home/\$(whoami)/logs/error.log'"
alias tmj-access-logs="ssh -q $REMOTE_HOST 'tail -f /home/\$(whoami)/logs/access.log'"

# Backup and recovery
alias tmj-backup="ssh $REMOTE_HOST 'cp -r $REMOTE_PATH $REMOTE_PATH.backup_\$(date +%Y%m%d_%H%M%S)'"
alias tmj-list-backups="ssh $REMOTE_HOST 'ls -la $REMOTE_PATH.backup_* 2>/dev/null || echo No backups found'"
alias tmj-restore='tmj-restore-backup() { if [ -z "\$1" ]; then echo "Usage: tmj-restore <backup_name>"; return 1; fi; ssh $REMOTE_HOST "rm -rf $REMOTE_PATH && mv \$1 $REMOTE_PATH"; echo "Restored \$1"; }; tmj-restore-backup'

# Development helpers
alias tmj-dev="npm run dev"
alias tmj-build="npm run build"
alias tmj-build-inject="npm run build:inject"
alias tmj-preview="npm run preview"

# Security and monitoring
alias tmj-security-check="./verify-production.sh"
alias tmj-scan-credentials="grep -r 'https.*supabase.co' --include='*.html' --include='*.js' . | grep -v node_modules"
alias tmj-scan-secrets="grep -r 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' --include='*.html' --include='*.js' . | grep -v node_modules"

# Quick deployment functions
tmj-quick-deploy() {
    echo "🚀 Quick deploy: Building and deploying..."
    npm run build && ./deploy-enhanced.sh --method=both
}

tmj-emergency-deploy() {
    echo "🚨 Emergency deploy: FTP only, forcing deployment..."
    ./deploy-preparation.sh && ./deploy-enhanced.sh --method=ftp --force
}

tmj-rollback() {
    echo "🔄 Rolling back to previous deployment..."
    LATEST_BACKUP=\$(ssh $REMOTE_HOST "ls -t $REMOTE_PATH.backup_* 2>/dev/null | head -1")
    if [ -n "\$LATEST_BACKUP" ]; then
        ssh $REMOTE_HOST "rm -rf $REMOTE_PATH && mv \$LATEST_BACKUP $REMOTE_PATH"
        echo "✅ Rolled back to \$LATEST_BACKUP"
    else
        echo "❌ No backups found for rollback"
    fi
}

# Environment management
tmj-env-prod() {
    if [ -f ".env.production" ]; then
        cp .env.production .env
        echo "✅ Switched to production environment"
    else
        echo "❌ .env.production not found"
    fi
}

tmj-env-dev() {
    if [ -f ".env.development" ]; then
        cp .env.development .env
        echo "✅ Switched to development environment"
    else
        echo "ℹ️ Creating development environment..."
        cp .env.production .env
        sed -i.bak 's/production/development/g' .env
        echo "✅ Development environment created"
    fi
}

# Help function
tmj-help() {
    echo "📋 TMJ Deployment Commands Help:"
    echo ""
    echo "� Deployment:"
    echo "  tmj-deploy         - Deploy using default method"
    echo "  tmj-deploy-branch  - Deploy via branch only"
    echo "  tmj-deploy-ftp     - Deploy via FTP only"
    echo "  tmj-deploy-force   - Force deployment"
    echo "  tmj-quick-deploy   - Quick build and deploy"
    echo "  tmj-emergency-deploy - Emergency FTP deployment"
    echo ""
    echo "🔧 Setup & Environment:"
    echo "  tmj-setup-secrets  - Configure GitHub secrets"
    echo "  tmj-setup-env      - Copy production env to .env"
    echo "  tmj-prepare        - Prepare deployment files"
    echo "  tmj-harden         - Apply security hardening"
    echo "  tmj-verify         - Verify production build"
    echo ""
    echo "🔄 Git & Workflow:"
    echo "  tmj-push-deploy    - Push and deploy"
    echo "  tmj-sync           - Pull and deploy"
    echo "  tmj-status         - Git status"
    echo ""
    echo "🖥️  Server Management:"
    echo "  tmj-connect        - SSH to server"
    echo "  tmj-server-status  - Check server status"
    echo "  tmj-logs           - View error logs"
    echo "  tmj-access-logs    - View access logs"
    echo ""
    echo "💾 Backup & Recovery:"
    echo "  tmj-backup         - Create backup"
    echo "  tmj-list-backups   - List available backups"
    echo "  tmj-restore <name> - Restore specific backup"
    echo "  tmj-rollback       - Rollback to latest backup"
    echo ""
    echo "🛡️  Security:"
    echo "  tmj-security-check - Run security verification"
    echo "  tmj-scan-credentials - Scan for hardcoded credentials"
    echo "  tmj-scan-secrets   - Scan for API keys"
    echo ""
    echo "🔧 Development:"
    echo "  tmj-dev            - Start development server"
    echo "  tmj-build          - Build project"
    echo "  tmj-build-inject   - Build with environment injection"
    echo "  tmj-preview        - Preview build"
    echo ""
    echo "🌍 Environment:"
    echo "  tmj-env-prod       - Switch to production env"
    echo "  tmj-env-dev        - Switch to development env"
}

EOF

echo "✅ Enhanced aliases added to $SHELL_RC"
echo "🔄 Reload your shell or run: source $SHELL_RC"
echo ""
echo "🎯 Quick start:"
echo "  1. Configure deploy.config with your Hostinger details"
echo "  2. Run 'tmj-setup-secrets' to configure GitHub secrets"
echo "  3. Run 'tmj-deploy' to deploy your application"
echo "  4. Use 'tmj-help' to see all available commands"
echo ""
echo "📋 Key new features:"
echo "  • Dual deployment methods (branch + FTP)"
echo "  • Environment variable injection"
echo "  • Comprehensive security hardening"
echo "  • Backup and rollback capabilities"
echo "  • Enhanced terminal workflow"
