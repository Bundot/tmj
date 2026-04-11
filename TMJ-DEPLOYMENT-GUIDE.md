# TMJ Complete Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the TMJ website to Hostinger using the sophisticated Teema-inspired deployment system. The system features dual deployment methods, comprehensive security hardening, and terminal-only configuration.

## 🚀 Quick Start

### One-Command Setup
```bash
./tmj-setup.sh
```

This script will:
- Install dependencies
- Create environment files
- Set up deployment configuration
- Configure terminal aliases
- Apply security hardening

### Manual Setup Steps
1. Configure `.env.production` with your credentials
2. Configure `deploy.config` with Hostinger details
3. Run `./setup-github-secrets.sh` to configure GitHub secrets
4. Run `./setup-terminal.sh` to setup helpful aliases

## 📁 Project Structure

```
tmj/
├── .env.production              # Production environment variables
├── .env                         # Local environment (copied from .env.production)
├── dev-env.js                   # Development environment loader
├── deploy.config                # Deployment configuration
├── deploy-enhanced.sh           # Enhanced deployment script
├── deploy-preparation.sh        # Deployment preparation script
├── deploy-production.sh         # Production deployment script
├── production-hardening.sh      # Security hardening script
├── setup-github-secrets.sh      # GitHub secrets configuration
├── setup-terminal.sh            # Terminal aliases setup
├── tmj-setup.sh                 # Complete setup script
├── verify-production.sh         # Production verification script
├── build.sh                     # Build script with environment injection
├── scripts/
│   └── write-supabase-config.js # Config generation script
├── .github/workflows/
│   └── deploy.yml               # GitHub Actions workflow
└── TMJ-DEPLOYMENT-GUIDE.md      # This guide
```

## 🔧 Configuration

### 1. Environment Variables

Edit `.env.production` with your actual credentials:

```bash
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# Environment Settings
NODE_ENV=production
ENABLE_CONSOLE_LOGS=false

# Hostinger FTP Configuration
FTP_SERVER=ftp.hostinger.com
FTP_USERNAME=your-hostinger-username
FTP_PASSWORD=your-hostinger-password
```

### 2. Deployment Configuration

Edit `deploy.config` with your Hostinger details:

```bash
# Hostinger Connection Details
HOSTINGER_HOST="your-domain.com"
HOSTINGER_USER="your-hostinger-username"
HOSTINGER_PATH="/home/your-username/public_html"

# Deployment Method Settings
DEFAULT_DEPLOY_METHOD="both"  # Options: "branch", "ftp", "both"
```

## 🚀 Deployment Methods

### Method 1: Branch-Based Deployment (Primary)

Automatically deploys to `hostinger-build` branch, which Hostinger can pull from:

```bash
./deploy-enhanced.sh --method=branch
```

**Advantages:**
- Version controlled
- Automatic via GitHub Actions
- Secure (no FTP credentials exposed)

### Method 2: FTP Deployment (Fallback)

Direct FTP upload to Hostinger:

```bash
./deploy-enhanced.sh --method=ftp
```

**Use Cases:**
- Emergency deployments
- Testing
- When GitHub Actions are unavailable

### Method 3: Dual Deployment (Recommended)

Uses both methods for maximum reliability:

```bash
./deploy-enhanced.sh --method=both
```

## 🔄 GitHub Actions CI/CD

The system includes a comprehensive GitHub Actions workflow that:

1. **Triggers** on pushes to main/master branches
2. **Injects** environment variables from GitHub Secrets
3. **Processes** HTML files to replace development with production environment
4. **Deploys** to both branch and FTP targets
5. **Applies** comprehensive security headers

### Required GitHub Secrets

Configure these using `./setup-github-secrets.sh`:

- `SUPABASE_URL`
- `SUPABASE_ANON`
- `SUPABASE_SERVICE_KEY`
- `ENABLE_CONSOLE_LOGS`
- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

## 🛡️ Security Features

### Environment Variable Injection

- **Development**: Uses `dev-env.js` with hardcoded credentials (localhost only)
- **Production**: Uses `env-inject.js` with GitHub Secrets injection
- **Automatic**: HTML files automatically switch between environments

### Security Headers

Comprehensive `.htaccess` with:

- **Content Security Policy (CSP)**
- **HTTPS Enforcement**
- **HSTS (HTTP Strict Transport Security)**
- **X-Frame-Options**
- **X-Content-Type-Options**
- **X-XSS-Protection**
- **Referrer Policy**
- **Permissions Policy**

### Security Hardening

Run `./production-hardening.sh` to:

- Remove hardcoded credentials
- Apply security configurations
- Create verification scripts
- Generate deployment checklist

## 🖥️ Terminal Commands

### Setup Commands

```bash
./tmj-setup.sh              # Complete setup
./setup-github-secrets.sh    # Configure GitHub secrets
./setup-terminal.sh          # Setup terminal aliases
```

### Deployment Commands

```bash
./deploy-enhanced.sh                 # Deploy with default method
./deploy-enhanced.sh --method=branch # Branch deployment only
./deploy-enhanced.sh --method=ftp    # FTP deployment only
./deploy-enhanced.sh --dry-run       # Dry run deployment
./deploy-enhanced.sh --force         # Force deployment
```

### Quick Commands (after terminal setup)

```bash
tmj-deploy              # Quick deploy
tmj-deploy-branch       # Branch deployment
tmj-deploy-ftp          # FTP deployment
tmj-quick-deploy        # Build and deploy
tmj-emergency-deploy    # Emergency FTP deployment
```

### Environment Management

```bash
tmj-env-prod            # Switch to production environment
tmj-env-dev             # Switch to development environment
tmj-setup-env           # Copy production env to .env
```

### Security Commands

```bash
tmj-security-check      # Run security verification
tmj-scan-credentials    # Scan for hardcoded credentials
tmj-scan-secrets        # Scan for API keys
./verify-production.sh  # Verify production build
```

### Server Management

```bash
tmj-connect             # SSH to server
tmj-server-status       # Check server status
tmj-logs                # View error logs
tmj-access-logs         # View access logs
```

### Backup and Recovery

```bash
tmj-backup              # Create backup
tmj-list-backups        # List available backups
tmj-restore <name>      # Restore specific backup
tmj-rollback            # Rollback to latest backup
```

## 🔄 Development Workflow

### 1. Local Development

```bash
# Setup development environment
tmj-env-dev
npm run dev

# Make changes to your code
git add .
git commit -m "Your changes"
git push origin main
```

### 2. Production Deployment

```bash
# Automatic deployment via GitHub Actions
# OR manual deployment:
tmj-deploy
```

### 3. Monitoring and Maintenance

```bash
# Check deployment status
tmj-server-status

# View logs
tmj-logs

# Security check
tmj-security-check
```

## 🔧 Environment Injection System

### Development Environment

- Uses `dev-env.js` for localhost
- Loads hardcoded credentials safely
- Enables console logging

### Production Environment

- Uses `env-inject.js` generated during build
- Loads credentials from GitHub Secrets
- Disables debug logging

### Build Process

1. **Environment Loading**: Reads from `.env.production`
2. **Script Generation**: Creates `env-inject.js` with production variables
3. **HTML Processing**: Replaces `dev-env.js` with `env-inject.js` in all HTML files
4. **Asset Compilation**: Copies all necessary files to deploy directory

## 📋 Deployment Checklist

### Pre-deployment

- [ ] Environment variables configured in `.env.production`
- [ ] GitHub secrets configured via `./setup-github-secrets.sh`
- [ ] Deployment configuration updated in `deploy.config`
- [ ] Security hardening applied via `./production-hardening.sh`
- [ ] Production verification passed via `./verify-production.sh`
- [ ] Test all functionality with production configuration

### Post-deployment

- [ ] Check browser console for errors
- [ ] Test CSP headers are working
- [ ] Verify no hardcoded credentials in page source
- [ ] Test authentication flow
- [ ] Test all CRUD operations
- [ ] Monitor for security warnings

## 🚨 Troubleshooting

### Common Issues

#### 1. GitHub Actions Fails
```bash
# Check secrets are configured
./setup-github-secrets.sh

# Verify workflow syntax
cd .github/workflows && yamllint deploy.yml
```

#### 2. FTP Deployment Fails
```bash
# Test FTP connection
ftp $FTP_SERVER

# Check credentials in deploy.config
cat deploy.config
```

#### 3. Environment Variables Not Loading
```bash
# Verify .env.production exists
ls -la .env.production

# Check environment injection
./deploy-preparation.sh && cat deploy/env-inject.js
```

#### 4. Security Headers Not Working
```bash
# Verify .htaccess is uploaded
ssh $USER@$HOST "cat public_html/.htaccess"

# Check Apache modules
ssh $USER@$Host "apache2ctl -M | grep headers"
```

### Debug Mode

Enable debug logging for troubleshooting:

```bash
# Set in .env.production
ENABLE_CONSOLE_LOGS=true

# Or temporarily for deployment
ENABLE_CONSOLE_LOGS=true ./deploy-enhanced.sh
```

## 📚 Advanced Configuration

### Custom Build Scripts

Modify `build.sh` for custom build processes:

```bash
#!/bin/bash
# Custom build process
npm run build:custom
# Add your custom steps here
```

### Custom Security Headers

Edit the `.htaccess` generation in `deploy-enhanced.sh`:

```bash
cat > deploy/.htaccess << EOF
# Custom security headers
Header set Custom-Security-Header "value"
EOF
```

### Multiple Environments

Create additional environment files:

```bash
# Staging environment
cp .env.production .env.staging
# Edit .env.staging with staging values
```

## 🔄 Maintenance

### Regular Tasks

1. **Weekly**: Run security verification
2. **Monthly**: Rotate Supabase keys
3. **Quarterly**: Review and update dependencies
4. **Annually**: Complete security audit

### Backup Strategy

```bash
# Automated daily backups
tmj-backup

# Weekly backup verification
tmj-list-backups
```

### Monitoring

```bash
# Set up log monitoring
tmj-logs | grep -E "ERROR|WARN"

# Security monitoring
tmj-scan-credentials
```

## 📞 Support

### Getting Help

```bash
# View all available commands
tmj-help

# Check system status
./deploy-enhanced.sh --dry-run
```

### Common Questions

**Q: How do I switch between deployment methods?**
A: Use the `--method` parameter: `--method=branch`, `--method=ftp`, or `--method=both`

**Q: How do I rollback a deployment?**
A: Use `tmj-rollback` or `tmj-restore <backup_name>`

**Q: How do I update environment variables?**
A: Edit `.env.production`, then run `./setup-github-secrets.sh`

**Q: How do I debug deployment issues?**
A: Use `--dry-run` flag and check logs in GitHub Actions

---

## 🎉 Summary

This comprehensive deployment system provides:

- ✅ **Dual deployment methods** for reliability
- ✅ **Environment variable injection** for security
- ✅ **Comprehensive security hardening** for protection
- ✅ **Terminal-only configuration** for efficiency
- ✅ **Automated CI/CD pipeline** for convenience
- ✅ **Backup and rollback capabilities** for safety
- ✅ **Extensive monitoring tools** for maintenance

Your TMJ application is now ready for secure, automated deployment to Hostinger!
