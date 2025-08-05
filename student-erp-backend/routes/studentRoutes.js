// // Import Express
// import express from 'express';

// // Route Initialization
// const router = express.Router(); 

// // Import controller functions
// import {
//   createStudent,
//   getAllStudents,
//   getStudentById,
//   updateStudent,
//   deleteStudent,
// } from '../controllers/studentController.js';

// import authMiddleware from '../middleware/authMiddleware.js';  // ✅ Auth check
// import authorizeRole from '../middleware/roleMiddleware.js';        // ✅ Role check

// // Create router instance
// const router = express.Router();

// // Role-based middleware
// function authorizeRoles(...allowedRoles) {
//   return (req, res, next) => {
//     const userRole = req.user?.role;
//     if (!allowedRoles.includes(userRole)) {
//       return res.status(403).json({ error: 'Access denied: insufficient permissions' });
//     }
//     next();
//   };
// }

// // Define routes 

// // Apply auth to all routes
// router.use(authMiddleware);

// // ✅ Create student (Admin only)
// router.post('/', authorizeRoles('admin'), createStudent);

// // 📄 Get all students (Admin, Teacher)
// router.get('/', authorizeRoles('admin', 'teacher'), getAllStudents);

// // 🔍 Get student by ID (Admin, Teacher)
// router.get('/:id', authorizeRoles('admin', 'teacher'), getStudentById);

// // ✏️ Update student (Admin only)
// router.put('/:id', authorizeRoles('admin'), updateStudent);

// // ❌ Delete student (Admin only)
// router.delete('/:id', authorizeRoles('admin'), deleteStudent);

// export default router;








// Import Express
import express from 'express';

// Route Initialization
const router = express.Router();

// Import controller functions
import {
  createStudent,
  getStudents,       // ✅ Assuming this returns all students
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';

import authMiddleware from '../middleware/authMiddleware.js';     // ✅ Auth check

// Import validation
import { studentValidationRules } from '../validators/studentValidator.js';
import validateRequest from '../middleware/validateRequest.js';


// ✅ Role-based middleware
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }
    next();
  };
}

// ✅ Apply auth to all routes
router.use(authMiddleware);

// ============================
// 🔐 Role-Based Student Routes
// ============================

// ✅ Create student → Admin, Teacher
router.post(
  '/', 
  authorizeRoles(['admin', 'teacher']), 
  studentValidationRules,         // 🧠 Add field validation
  validateRequest,                // 🛡️ Handle validation errors
  createStudent
);

// 📄 Get all students → Admin, Teacher, Student
router.get(
  '/', 
  authorizeRoles(['admin', 'teacher', 'student']), 
  getAllStudents
);

// 🔍 Get student by ID → Admin, Teacher, Student
router.get(
  '/:id', 
  authorizeRoles(['admin', 'teacher', 'student']), 
  getStudentById
);

// ✏️ Update student → Admin, Teacher
router.put(
  '/:id', 
  authorizeRoles(['admin', 'teacher']),
  studentValidationRules,         // 🧠 Add field validation
  validateRequest,                // 🛡️ Handle validation errors 
  updateStudent
);

// ❌ Delete student → Admin, Teacher
router.delete(
  '/:id', 
  authorizeRoles(['admin', 'teacher']), 
  deleteStudent
);

export default router;

