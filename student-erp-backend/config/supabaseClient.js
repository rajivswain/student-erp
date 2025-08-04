// // ES Module standard

// import 'dotenv/config'; // Automatically loads variables from .env
// import { createClient } from '@supabase/supabase-js';

// // Get Supabase credentials from environment
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error('❌ Missing SUPABASE_URL or SUPABASE_KEY in environment variables');
// }

// // Create Supabase client instance
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Export the client
// export default supabase;


// Load environment variables from .env
import 'dotenv/config'; // Same as: import dotenv from 'dotenv'; dotenv.config();
import { createClient } from '@supabase/supabase-js';

// ✅ Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// 🔒 Throw explicit error if either is missing
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables.');
  throw new Error('Missing SUPABASE_URL or SUPABASE_KEY. Please check your .env file.');
}

// ✅ Create Supabase client (with service_role key for backend use only)
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// ✅ Export the client for use in your backend routes/controllers
export default supabase;
