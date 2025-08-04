
// import { verifyToken } from '../utils/jwt.js';

// function authMiddleware(req, res, next) {
//   const authHeader = req.headers['authorization'];

//   if (!authHeader) {
//     return res.status(401).json({ error: 'Authorization header missing' });
//   }

//   const parts = authHeader.split(' ');
//   if (parts.length !== 2 || parts[0] !== 'Bearer') {
//     return res.status(401).json({ error: 'Invalid Authorization format' });
//   }

//   const token = parts[1];

//   try {
//     const decoded = verifyToken(token); // Verifies the JWT

//     req.user = {
//       userId: decoded.userId,
//       role: decoded.role,
//     };
//     next(); // Proceed to the route
//   } catch (err) {
//     return res.status(401).json({ error: 'Invalid or expired token' });
//   }
// }

// export default authMiddleware;


import { verifyToken } from '../utils/jwt.js';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  // Validate Bearer format
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid Authorization format' });
  }

  const token = parts[1];

  try {
    // Verify and decode the token
    const decoded = verifyToken(token);

    // Optional: Log user info in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Authenticated user:', decoded);
    }

    // Attach user info to request object
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next(); // Proceed to next middleware or route
  } catch (err) {
    // Handle token expiration separately
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }

    return res.status(401).json({ error: 'Invalid or malformed token' });
  }
}

export default authMiddleware;
