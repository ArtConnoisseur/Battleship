import { createClient } from '@supabase/supabase-js';
import * as process from 'node:process'

// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_URL
);

export default supabase;
