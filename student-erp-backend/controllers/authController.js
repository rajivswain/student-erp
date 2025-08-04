// // Import Supabase client and custom JWT utility using ES module syntax
// import supabase from '../config/supabaseClient.js'; // Database and Auth API
// import { signToken } from '../utils/jwt.js';        // JWT token generator

// /**
//  * @desc Handles user signup
//  * @route POST /signup
//  * @body { email, password, full_name, role }
//  */
// export const signup = async (req, res) => {
//   try {
//     const { email, password, full_name, role } = req.body;

//     // ✅ Validate role
//     const validRoles = ['admin', 'teacher', 'student'];
//     if (!validRoles.includes(role)) {
//       return res.status(400).json({ error: 'Invalid role' });
//     }

//     // ✅ Step 1: Create user in Supabase Auth (admin-level)
//     const { data, error } = await supabase.auth.admin.createUser({
//       email,
//       password,
//       email_confirm: true, // Auto confirm user
//     });

//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     const userId = data.user.id;

//     // ✅ Step 2: Insert additional user info into `profiles` table
//     const { error: profileError } = await supabase
//       .from('profiles')
//       .insert([{ id: userId, full_name, role }]);

//     if (profileError) {
//       return res.status(400).json({ error: profileError.message });
//     }

//     // ✅ Step 3: Generate JWT for the new user
//     const token = signToken(userId, role); 

//     // ✅ Step 4: Send success response
//     res.status(201).json({
//       message: 'User created successfully',
//       userId,
//       role,
//       token,
//     });

//   } catch (err) {
//     console.error('Signup error:', err.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// /**
//  * @desc Handles user login
//  * @route POST /login
//  * @body { email, password }
//  */
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // ✅ Step 1: Authenticate user using email & password
//     const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (loginError) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const user = loginData.user;

//     // ✅ Step 2: Fetch user's role and full_name from `profiles` table
//     const { data: profile, error: profileError } = await supabase
//       .from('profiles')
//       .select('full_name, role')
//       .eq('id', user.id)
//       .single();

//     if (profileError || !profile) {
//       return res.status(400).json({ error: 'Profile not found for this user' });
//     }

//     const { full_name, role } = profile;

//     // ✅ Step 3: Generate JWT
//     const token = signToken(user.id, role);

//     // ✅ Step 4: Send response
//     res.json({
//       message: 'Login successful',
//       user: {
//         id: user.id,
//         email: user.email,
//         full_name,
//         role,
//       },
//       token,
//     });

//   } catch (err) {
//     console.error('Login error:', err.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };






// Import Supabase client and JWT utility
import supabase from '../config/supabaseClient.js'; // Handles Supabase Auth + DB
import { signToken } from '../utils/jwt.js';        // Custom JWT sign function

/**
 * @desc Handles user signup
 * @route POST /api/auth/signup
 * @access Public
 * @body { email, password, full_name, role }
 */
export const signup = async (req, res) => {
  try {
    const { email, password, full_name, role } = req.body;

    // ✅ 1. Validate user role
    const validRoles = ['admin', 'teacher', 'student'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: '❌ Invalid role' });
    }

    // ✅ 2. Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Skips email verification
    });

    if (error) {
      return res.status(400).json({ error: `Auth error: ${error.message}` });
    }

    const userId = data.user.id;

    // ✅ 3. Store additional profile info in 'profiles' table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: userId, full_name, role }]);

    if (profileError) {
      return res.status(400).json({ error: `Profile error: ${profileError.message}` });
    }

    // ✅ 4. Generate token
    const token = signToken(userId, role);

    // ✅ 5. Success response
    return res.status(201).json({
      message: '✅ User created successfully',
      userId,
      role,
      token,
    });

  } catch (err) {
    console.error('❌ Signup error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * @desc Handles user login
 * @route POST /api/auth/login
 * @access Public
 * @body { email, password }
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ 1. Login using Supabase Auth
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError || !loginData.user) {
      return res.status(400).json({ error: '❌ Invalid email or password' });
    }

    const user = loginData.user;

    // ✅ 2. Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: '❌ Profile not found for this user' });
    }

    const { full_name, role } = profile;

    // ✅ 3. Generate JWT token
    const token = signToken(user.id, role);

    // ✅ 4. Return response
    return res.status(200).json({
      message: '✅ Login successful',
      user: {
        id: user.id,
        email: user.email,
        full_name,
        role,
      },
      token,
    });

  } catch (err) {
    console.error('❌ Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
