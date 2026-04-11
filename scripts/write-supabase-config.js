#!/usr/bin/env node
// Write a small JS file that sets window.SUPABASE_URL and window.SUPABASE_ANON
// This file is intended to be created at build time (CI / Vercel) using environment variables
// and must NOT be committed. Add it to .gitignore.

import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

config({ path: '.env.production' });

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const anon = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON || '';
const serviceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!url || !anon) {
  console.warn('SUPABASE_URL or SUPABASE_ANON not set; writing empty config (admin will fallback to local JSON).');
}

const outDir = path.resolve(process.cwd(), 'config');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const content = `// Auto-generated at build time. Do NOT commit to source control.\n` +
  `window.SUPABASE_URL = ${JSON.stringify(url)};\n` +
  `window.SUPABASE_ANON = ${JSON.stringify(anon)};\n` +
  `window.SUPABASE_SERVICE_KEY = ${JSON.stringify(serviceKey)};\n` +
  `window.NODE_ENV = 'production';\n` +
  `window.ENABLE_CONSOLE_LOGS = ${JSON.stringify(process.env.ENABLE_CONSOLE_LOGS || 'false')};\n` +
  `\nconsole.log('🌍 Environment variables injected by build process');\n` +
  `console.log('🌐 SUPABASE_URL:', window.SUPABASE_URL ? '✅' : '❌');\n` +
  `console.log('🔑 SUPABASE_ANON:', window.SUPABASE_ANON ? '✅' : '❌');\n`;

fs.writeFileSync(path.join(outDir, 'supabase.js'), content, { encoding: 'utf8' });
console.log('✅ Wrote config/supabase.js');
