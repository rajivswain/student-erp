// /**
//  * Middleware to check if the user has one of the allowed roles
//  * @param {Array<string>} allowedRoles - Roles that are allowed to access the route
//  */
// function authorizeRole(allowedRoles = []) {
//   // Ensure allowedRoles is an array of strings
//   if (!Array.isArray(allowedRoles)) {
//     throw new Error('authorizeRole middleware expects an array of allowed roles.');
//   }

//   return (req, res, next) => {
//     const user = req.user;

//     // Check if user and role are present
//     if (!user || typeof user.role !== 'string') {
//       return res.status(403).json({
//         error: 'Access forbidden: No valid user role found. Please authenticate.',
//       });
//     }

//     // Check if user's role is allowed
//     if (!allowedRoles.includes(user.role)) {
//       return res.status(403).json({
//         error: `Access denied: Role '${user.role}' is not authorized to access this resource.`,
//       });
//     }

//     // Role is authorized
//     next();
//   };
// }

// module.exports = authorizeRole;

// Without ES Module Standard

// middleware/authorizeRole.js
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

// module.exports = authorizeRole;




// With ES Module Standard


function authorizeRole(allowedRoles = []) {
  if (!Array.isArray(allowedRoles)) {
    throw new Error('authorizeRole middleware expects an array of allowed roles.');
  }

  return (req, res, next) => {
    const user = req.user;

    if (!user || typeof user.role !== 'string') {
      return res.status(403).json({
        error: 'Access forbidden: No valid user role found. Please authenticate.'
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        error: `Access denied: Role '${user.role}' is not authorized.`
      });
    }

    next();
  };
}

export default authorizeRole;
