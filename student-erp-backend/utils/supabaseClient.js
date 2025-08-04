// utils/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for server-side operations

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
