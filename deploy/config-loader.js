// TMJ Configuration Loader
// Loads configuration based on environment

(function() {
    'use strict';

    // Determine environment
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
        // Development environment - dev-env.js will handle loading
        console.log('🔧 Development environment detected');
    } else {
        // Production environment - env-inject.js should be loaded
        console.log('🌍 Production environment detected');
        
        // Verify environment variables are loaded
        if (!window.SUPABASE_URL || !window.SUPABASE_ANON) {
            console.error('❌ Production environment variables not loaded');
        }
    }
})();
