// With ES Module Standard


// function authorizeRole(allowedRoles = []) {
//   if (!Array.isArray(allowedRoles)) {
//     throw new Error('authorizeRole middleware expects an array of allowed roles.');
//   }

//   return (req, res, next) => {
//     const user = req.user;

//     if (!user || typeof user.role !== 'string') {
//       return res.status(403).json({
//         error: 'Access forbidden: No valid user role found. Please authenticate.'
//       });
//     }

//     if (!allowedRoles.includes(user.role)) {
//       return res.status(403).json({
//         error: `Access denied: Role '${user.role}' is not authorized.`
//       });
//     }

//     next();
//   };
// }

// export default authorizeRole;



function authorizeRole(allowedRoles = []) {
  if (!Array.isArray(allowedRoles)) {
    throw new Error('authorizeRole middleware expects an array of allowed roles.');
  }

  return (req, res, next) => {
    const user = req.user;

    if (!user || typeof user.role !== 'string') {
      return res.status(403).json({
        error: 'Access forbidden: No valid user role found. Please log in.'
      });
    }

    if (!allowedRoles.includes(user.role)) {
      // Optional: log unauthorized access attempt in dev mode
      if (process.env.NODE_ENV === 'development') {
        console.warn(`🚫 Unauthorized role access attempt: ${user.role}`);
      }

      return res.status(403).json({
        error: `Access denied: Role '${user.role}' is not authorized for this action.`
      });
    }

    next(); // Role is authorized, proceed
  };
}

export default authorizeRole;

