// TMJ Security Validator
// Validates security configurations and checks for vulnerabilities

(function() {
    'use strict';

    const TMJSecurityValidator = {
        // Check if HTTPS is being used
        isHTTPS: function() {
            return window.location.protocol === 'https:';
        },

        // Validate environment variables
        validateEnvironment: function() {
            const issues = [];
            
            if (!window.SUPABASE_URL) {
                issues.push('SUPABASE_URL not defined');
            }
            
            if (!window.SUPABASE_ANON) {
                issues.push('SUPABASE_ANON not defined');
            }
            
            if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                if (window.ENABLE_CONSOLE_LOGS === 'true') {
                    issues.push('Console logs enabled in production');
                }
            }
            
            return {
                isValid: issues.length === 0,
                issues: issues
            };
        },

        // Check for security headers
        checkSecurityHeaders: function() {
            // This would typically be checked server-side
            // Client-side we can only check for certain indicators
            const checks = {
                csp: !!document.querySelector('meta[http-equiv="Content-Security-Policy"]'),
                hsts: this.isHTTPS() // HSTS only works with HTTPS
            };
            
            return checks;
        },

        // Validate Supabase URL
        validateSupabaseURL: function() {
            if (!window.SUPABASE_URL) return false;
            
            try {
                const url = new URL(window.SUPABASE_URL);
                return url.protocol === 'https:' && url.hostname.includes('supabase.co');
            } catch (e) {
                return false;
            }
        },

        // Run all security checks
        runSecurityCheck: function() {
            const results = {
                timestamp: new Date().toISOString(),
                environment: this.validateEnvironment(),
                https: this.isHTTPS(),
                supabaseURL: this.validateSupabaseURL(),
                headers: this.checkSecurityHeaders()
            };
            
            // Log results in development only
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('🔒 Security Check Results:', results);
            }
            
            return results;
        }
    };

    // Export to global scope
    window.TMJSecurityValidator = TMJSecurityValidator;
    
    // Auto-run security check in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        document.addEventListener('DOMContentLoaded', function() {
            TMJSecurityValidator.runSecurityCheck();
        });
    }
})();
