// // Import Express
// import express from 'express';

// // Route Initialization
// const router = express.Router();

// // Import controller functions
// import {
//   createStudent,
//   getStudents,       // ✅ Assuming this returns all students
//   getStudentById,
//   updateStudent,
//   deleteStudent,
// } from '../controllers/studentController.js';

// import authMiddleware from '../middleware/authMiddleware.js';     // ✅ Auth check

// // Import validation
// import { studentValidationRules } from '../validators/studentValidator.js';
// import validateRequest from '../middleware/validateRequest.js';


// // ✅ Role-based middleware
// function authorizeRoles(...allowedRoles) {
//   return (req, res, next) => {
//     const userRole = req.user?.role;
//     if (!allowedRoles.includes(userRole)) {
//       return res.status(403).json({ error: 'Access denied: insufficient permissions' });
//     }
//     next();
//   };
// }

// // ✅ Apply auth to all routes
// router.use(authMiddleware);

// // ============================
// // 🔐 Role-Based Student Routes
// // ============================

// // ✅ Create student → Admin, Teacher
// router.post(
//   '/', 
//   authorizeRoles(['admin', 'teacher']), 
//   studentValidationRules,         // 🧠 Add field validation
//   validateRequest,                // 🛡️ Handle validation errors
//   createStudent
// );

// // 📄 Get all students → Admin, Teacher, Student
// router.get(
//   '/', 
//   authorizeRoles(['admin', 'teacher', 'student']), 
//   getStudents
// );

// // 🔍 Get student by ID → Admin, Teacher, Student
// router.get(
//   '/:id', 
//   authorizeRoles(['admin', 'teacher', 'student']), 
//   getStudentById
// );

// // ✏️ Update student → Admin, Teacher
// router.put(
//   '/:id', 
//   authorizeRoles(['admin', 'teacher']),
//   studentValidationRules,         // 🧠 Add field validation
//   validateRequest,                // 🛡️ Handle validation errors 
//   updateStudent
// );

// // ❌ Delete student → Admin, Teacher
// router.delete(
//   '/:id', 
//   authorizeRoles(['admin', 'teacher']), 
//   deleteStudent
// );

// export default router;




// 📦 Import Express framework
import express from 'express';

// 🚀 Initialize Express Router
const router = express.Router();

// 📥 Import controller functions for student operations
import {
  createStudent,       // 🆕 Create a new student
  getStudents,         // 📄 Get all students (with pagination)
  getStudentById,      // 🔍 Get a student by ID
  updateStudent,       // ✏️ Update student details
  deleteStudent        // ❌ Delete a student
} from '../controllers/studentController.js';

// 🔐 Import authentication middleware to verify JWT
import authMiddleware from '../middleware/authMiddleware.js';

// 📏 Import validation rules for student fields
import { studentValidationRules } from '../validators/studentValidator.js';

// 🛡️ Middleware to handle validation errors
import validateRequest from '../middleware/validateRequest.js';

// ============================
// 🔐 Role-Based Access Control
// ============================

// ✅ Middleware to restrict access based on user roles
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role; // 🧠 Extract role from authenticated user
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' }); // 🚫 Forbidden
    }
    next(); // ✅ Proceed if role is authorized
  };
}

// ============================
// 🔐 Apply Auth Globally to All Routes
// ============================

// 🔒 Protect all student routes with authentication
router.use(authMiddleware);

// ============================
// 📚 Student Routes with Role-Based Access
// ============================

// 🆕 Create student → Only Admin and Teacher
router.post(
  '/', 
  authorizeRoles('admin', 'teacher'),     // 🔐 Role check
  studentValidationRules,                 // 📏 Validate input fields
  validateRequest,                        // 🛡️ Handle validation errors
  createStudent                           // 🧠 Controller to create student
);

// 📄 Get all students (with pagination) → Admin, Teacher, Student
router.get(
  '/', 
  authorizeRoles('admin', 'teacher', 'student'), // 🔐 Role check
  getStudents                                     // 🧠 Controller to fetch students
);

// 🔍 Get student by ID → Admin, Teacher, Student
router.get(
  '/:id', 
  authorizeRoles('admin', 'teacher', 'student'), // 🔐 Role check
  getStudentById                                 // 🧠 Controller to fetch student by ID
);

// ✏️ Update student → Only Admin and Teacher
router.put(
  '/:id', 
  authorizeRoles('admin', 'teacher'),     // 🔐 Role check
  studentValidationRules,                 // 📏 Validate input fields
  validateRequest,                        // 🛡️ Handle validation errors
  updateStudent                           // 🧠 Controller to update student
);

// ❌ Delete student → Only Admin and Teacher
router.delete(
  '/:id', 
  authorizeRoles('admin', 'teacher'),     // 🔐 Role check
  deleteStudent                           // 🧠 Controller to delete student
);

// 📤 Export the router to be used in main app
export default router;


