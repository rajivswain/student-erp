
// Without ES Module Standard


// const { createClient } = require('@supabase/supabase-js');
// require('dotenv').config(); // Loads .env variables

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );

// module.exports = supabase;

// config/supabaseClient.js



// ES Module standard

import 'dotenv/config'; // Automatically loads variables from .env
import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('❌ Missing SUPABASE_URL or SUPABASE_KEY in environment variables');
}

// Create Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

// Export the client
export default supabase;
