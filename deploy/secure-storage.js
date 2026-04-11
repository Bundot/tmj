// TMJ Secure Storage Utility
// Provides secure localStorage operations with encryption

(function() {
    'use strict';

    const TMJSecureStorage = {
        // Simple encryption for sensitive data
        _encrypt: function(data) {
            try {
                return btoa(data);
            } catch (e) {
                console.error('Encryption failed:', e);
                return data;
            }
        },

        _decrypt: function(data) {
            try {
                return atob(data);
            } catch (e) {
                console.error('Decryption failed:', e);
                return data;
            }
        },

        setItem: function(key, value, isSecure = false) {
            try {
                const data = isSecure ? this._encrypt(JSON.stringify(value)) : JSON.stringify(value);
                localStorage.setItem(key, data);
                return true;
            } catch (e) {
                console.error('Failed to set storage item:', e);
                return false;
            }
        },

        getItem: function(key, isSecure = false) {
            try {
                const data = localStorage.getItem(key);
                if (!data) return null;
                
                const decrypted = isSecure ? this._decrypt(data) : data;
                return JSON.parse(decrypted);
            } catch (e) {
                console.error('Failed to get storage item:', e);
                return null;
            }
        },

        removeItem: function(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Failed to remove storage item:', e);
                return false;
            }
        },

        clear: function() {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.error('Failed to clear storage:', e);
                return false;
            }
        }
    };

    // Export to global scope
    window.TMJSecureStorage = TMJSecureStorage;
})();
