// // jwt.js
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_EXPIRES_IN = '7d'; // Token expiry duration

// // Check for JWT_SECRET to avoid silent failures in production
// if (!JWT_SECRET) {
//   throw new Error('JWT_SECRET is not defined in environment variables.');
// }

// /**
//  * Generate a signed JWT token.
//  * 
//  * @param {string} userId - Supabase user ID (UUID).
//  * @param {string} role - User role (e.g., admin, teacher, student).
//  * @returns {string} - Signed JWT token.
//  */
// export function signToken(userId, role) { 
//   const payload = { userId, role }; 
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
// }

// /**
//  * Verify a JWT token and return the decoded payload.
//  * 
//  * @param {string} token - JWT token to verify.
//  * @returns {object} - Decoded token data (e.g., userId, role, iat, exp).
//  * @throws {Error} - If token is invalid or expired.
//  */
// export function verifyToken(token) {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     throw new Error('Invalid or expired token');
//   }
// }




import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}

/**
 * Generate a signed JWT token.
 * @param {string} userId - Supabase user ID (UUID).
 * @param {string} role - User role (e.g., admin, teacher, student).
 * @returns {string} - Signed JWT token.
 */
export function signToken(userId, role) {
  const payload = { userId, role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: role === 'admin' ? '1d' : JWT_EXPIRES_IN });
}

/**
 * Verify a JWT token and return the decoded payload.
 * @param {string} token - JWT token to verify.
 * @returns {object} - Decoded token data.
 * @throws {Error} - If token is invalid or expired.
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}
  