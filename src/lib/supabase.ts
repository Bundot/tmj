import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || (window as any).SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || (window as any).SUPABASE_ANON;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables. URL:', !!supabaseUrl, 'Key:', !!supabaseAnonKey);
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);