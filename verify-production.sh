#!/bin/bash
echo "🔍 Verifying TMJ production build security..."

# Check for hardcoded credentials
if grep -r "SUPABASE_URL.*https" --include="*.html" --include="*.js" . | grep -v "config/supabase.prod.js"; then
    echo "❌ Found hardcoded credentials in source files!"
    exit 1
fi

# Check for console.log in production files
if grep -r "console\.log" --include="*.html" --include="*.js" . | grep -v "node_modules" | grep -v "verify-production.sh"; then
    echo "⚠️ Found console.log statements - consider removing for production"
fi

# Check if .env is properly excluded
if grep -q "^\.env$" .gitignore; then
    echo "✅ .env is in .gitignore"
else
    echo "❌ .env not found in .gitignore"
    exit 1
fi

# Check security scripts are present
if [ -f "config-loader.js" ] && [ -f "secure-storage.js" ] && [ -f "security-validator.js" ]; then
    echo "✅ Security scripts are present"
else
    echo "❌ Missing security scripts"
    exit 1
fi

echo "✅ Production build verification passed"
