// Development Environment Setup for TMJ
// This script loads environment variables for local development
// This file is safe for local development only - contains hardcoded credentials

// Only run in development environment
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    
    // Development environment variables (copied from .env)
    // This is safe for local development only
    window.SUPABASE_URL = 'https://rmcphwbwhyfkejlpqbpt.supabase.co';
    window.SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtY3Bod2J3aHlma2VqbHBxYnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NDI0NTksImV4cCI6MjA5MTQxODQ1OX0.C42qKHjDdSlSo1c0sx3vNRzyeI1fP0GiNEZPFdIvaBs';
    window.SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtY3Bod2J3aHlma2VqbHBxYnB0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTg0MjQ1OSwiZXhwIjoyMDkxNDE4NDU5fQ.nFqgBKtq0FjuS-AQh8zA85PQ07Mr1Uq1bEl1zogndvk';
    
    console.log('🔧 Development environment variables loaded');
    console.log('🌐 SUPABASE_URL:', window.SUPABASE_URL ? '✅' : '❌');
    console.log('🔑 SUPABASE_ANON:', window.SUPABASE_ANON ? '✅' : '❌');
    
} else {
    console.log('🌍 Production environment detected - using injected environment variables');
}
