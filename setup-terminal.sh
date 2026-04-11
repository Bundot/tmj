#!/bin/bash

# Setup terminal aliases for TMJ deployment
# Run this once to add aliases to your shell

echo "🔧 Setting up TMJ deployment aliases..."

# Add to .zshrc or .bashrc
SHELL_RC="$HOME/.zshrc"
if [ ! -f "$SHELL_RC" ]; then
    SHELL_RC="$HOME/.bashrc"
fi

cat >> "$SHELL_RC" << 'EOF'

# TMJ Deployment Aliases
alias tmj-deploy="./deploy-enhanced.sh"
alias tmj-deploy-dry="./deploy-enhanced.sh --dry-run"
alias tmj-status="ssh -q your-hostinger-username@your-domain.com 'uptime && df -h'"
alias tmj-logs="ssh -q your-hostinger-username@your-domain.com 'tail -f /home/your-hostinger-username/logs/error.log'"
alias tmj-backup="ssh your-hostinger-username@your-domain.com 'cp -r /home/your-hostinger-username/public_html /home/your-hostinger-username/backup_$(date +%Y%m%d_%H%M%S)'"
alias tmj-connect="ssh your-hostinger-username@your-domain.com"

# TMJ Git workflow
alias tmj-push-deploy="git push origin main && ./deploy-enhanced.sh"
alias tmj-sync="git pull origin main && ./deploy-enhanced.sh"

EOF

echo "✅ Aliases added to $SHELL_RC"
echo "🔄 Reload your shell or run: source $SHELL_RC"
echo ""
echo "📋 Available commands:"
echo "  tmj-deploy      - Deploy to Hostinger"
echo "  tmj-deploy-dry  - Dry run deployment"
echo "  tmj-status      - Check server status"
echo "  tmj-logs        - View server logs"
echo "  tmj-backup      - Create backup"
echo "  tmj-connect     - SSH to server"
echo "  tmj-push-deploy - Push to GitHub and deploy"
echo "  tmj-sync        - Pull from GitHub and deploy"
