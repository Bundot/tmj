# TMJ Production Deployment Checklist

## Pre-deployment Security Checks

- [ ] Environment variables configured in .env
- [ ] Supabase keys rotated (if needed)
- [ ] Run `./verify-production.sh` to check security
- [ ] Test all functionality with production config
- [ ] Remove any debug console.log statements
- [ ] Verify HTTPS is configured
- [ ] Test authentication flow
- [ ] Test product CRUD operations
- [ ] Verify security headers are working

## Post-deployment Verification

- [ ] Check browser console for errors
- [ ] Test CSP headers are working (use browser dev tools)
- [ ] Verify no hardcoded credentials in page source
- [ ] Test rate limiting
- [ ] Verify secure storage is working
- [ ] Test XSS prevention
- [ ] Monitor for any security warnings

## Security Monitoring

- [ ] Set up error monitoring
- [ ] Monitor authentication failures
- [ ] Set up alerts for suspicious activity
- [ ] Regular security audits scheduled

## Rollback Plan

- [ ] Backup current production files
- [ ] Document rollback procedure
- [ ] Test rollback process

