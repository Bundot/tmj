# TMJ - Advanced Hostinger Deployment System

A sophisticated deployment system for the TMJ website featuring dual deployment methods, comprehensive security hardening, and terminal-only configuration based on the Teema architecture.

## 🚀 Quick Start

```bash
# One-command complete setup
./tmj-setup.sh

# Or manual setup:
# 1. Configure .env.production with your credentials
# 2. Configure deploy.config with Hostinger details  
# 3. Run ./setup-github-secrets.sh
# 4. Run ./setup-terminal.sh
# 5. Deploy with ./deploy-enhanced.sh
```

## ✨ Key Features

- **🔄 Dual Deployment Methods**: Branch-based (primary) + FTP (fallback)
- **🛡️ Comprehensive Security**: CSP headers, HSTS, XSS protection
- **🔧 Environment Injection**: Automatic environment variable management
- **🖥️ Terminal-Only**: Complete command-line workflow
- **🚀 CI/CD Pipeline**: Automated GitHub Actions deployment
- **💾 Backup & Recovery**: Built-in backup and rollback system
- **🔍 Security Monitoring**: Automated security verification

## 📋 Prerequisites

- Node.js and npm
- Git
- Hostinger shared hosting account
- (Optional) GitHub CLI for automated secret setup

## 🏗️ Architecture

```
GitHub Repository → GitHub Actions → Dual Deployment → Hostinger
                                     ├─ Branch (hostinger-build)
                                     └─ FTP (fallback)
```

## 🔧 Configuration Files

- `.env.production` - Production environment variables
- `deploy.config` - Hostinger connection settings
- `.github/workflows/deploy.yml` - CI/CD pipeline

## 🚀 Deployment Commands

```bash
# Basic deployment
./deploy-enhanced.sh

# Specific methods
./deploy-enhanced.sh --method=branch    # Branch deployment
./deploy-enhanced.sh --method=ftp       # FTP deployment  
./deploy-enhanced.sh --method=both      # Dual deployment

# Testing
./deploy-enhanced.sh --dry-run          # Test deployment
```

## 🖥️ Terminal Aliases (after setup)

```bash
tmj-deploy              # Quick deploy
tmj-deploy-branch       # Branch deployment
tmj-deploy-ftp          # FTP deployment
tmj-quick-deploy        # Build and deploy
tmj-emergency-deploy    # Emergency FTP deployment
tmj-security-check      # Security verification
tmj-backup              # Create backup
tmj-rollback            # Rollback deployment
tmj-help                # Show all commands
```

## 🛡️ Security Features

- **Environment Variable Injection**: No hardcoded credentials in production
- **Content Security Policy**: Comprehensive CSP headers
- **HTTPS Enforcement**: Automatic HTTPS redirects
- **Security Headers**: HSTS, XSS protection, frame options
- **File Protection**: Restricted access to sensitive files
- **Credential Scanning**: Automated detection of hardcoded secrets

## 📚 Documentation

- **[Complete Deployment Guide](./TMJ-DEPLOYMENT-GUIDE.md)** - Comprehensive documentation
- **[Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)** - Pre/post-deployment checks
- **[Security Guide](./verify-production.sh)** - Security verification

## 🔍 Environment System

### Development
- Uses `dev-env.js` for localhost
- Hardcoded credentials (safe for local only)
- Console logging enabled

### Production  
- Uses `env-inject.js` generated during build
- Credentials from GitHub Secrets
- Console logging disabled

## 🔄 CI/CD Pipeline

1. **Trigger**: Push to main/master branch
2. **Build**: Environment injection + file processing
3. **Security**: Apply comprehensive security headers
4. **Deploy**: Dual deployment (branch + FTP)
5. **Verify**: Automated security validation

## 📊 Deployment Methods

| Method | Use Case | Advantages |
|--------|----------|------------|
| **Branch** | Primary deployment | Version controlled, automatic, secure |
| **FTP** | Fallback/emergency | Direct access, testing, manual control |
| **Both** | Recommended | Maximum reliability, redundancy |

## 🛠️ Setup Scripts

- `./tmj-setup.sh` - Complete one-command setup
- `./setup-github-secrets.sh` - Configure GitHub secrets
- `./setup-terminal.sh` - Setup terminal aliases
- `./production-hardening.sh` - Apply security hardening
- `./verify-production.sh` - Verify production build

## 🔧 Development Workflow

```bash
# Development
tmj-env-dev
npm run dev

# Commit and deploy
git add .
git commit -m "Changes"
git push origin main

# Automatic deployment via GitHub Actions
# OR manual: tmj-deploy
```

## 🚨 Troubleshooting

```bash
# Check deployment status
./deploy-enhanced.sh --dry-run

# Verify security
./verify-production.sh

# Check configuration
cat deploy.config
cat .env.production

# View logs
tmj-logs
```

## 📋 Requirements Summary

### Development
- Node.js 18+
- npm
- Git
- (Optional) GitHub CLI

### Production
- Hostinger shared hosting
- FTP access
- Apache/LiteSpeed server
- SSL certificate

### Security
- GitHub repository with Actions enabled
- Supabase project (or alternative backend)
- Environment variables configured

## 🎯 Quick Deployment Checklist

- [ ] Configure `.env.production` with credentials
- [ ] Configure `deploy.config` with Hostinger details
- [ ] Run `./setup-github-secrets.sh`
- [ ] Run `./setup-terminal.sh` for aliases
- [ ] Test with `./deploy-enhanced.sh --dry-run`
- [ ] Deploy with `./deploy-enhanced.sh`

## 📞 Support

For help:
```bash
tmj-help                    # Show all commands
./deploy-enhanced.sh --help # Deployment help
```

---

**Built with the Teema deployment architecture** - Providing robust, secure, and automated deployment for modern web applications.
