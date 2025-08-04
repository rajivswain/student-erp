
import { verifyToken } from '../utils/jwt.js';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid Authorization format' });
  }

  const token = parts[1];

  try {
    const decoded = verifyToken(token); // Verifies the JWT

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    next(); // Proceed to the route
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export default authMiddleware;
