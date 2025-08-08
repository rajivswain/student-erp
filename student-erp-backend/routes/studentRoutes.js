
// // 📦 Import Express framework
// import express from 'express';

// // 🚀 Initialize Express Router
// const router = express.Router();

// // 📥 Import controller functions for student operations
// import {
//   createStudent,       // 🆕 Create a new student
//   getStudents,         // 📄 Get all students (with pagination)
//   getStudentById,      // 🔍 Get a student by ID
//   updateStudent,       // ✏️ Update student details
//   deleteStudent        // ❌ Delete a student
// } from '../controllers/studentController.js';

// // 🖼️ Import upload middleware for file uploads
// import upload from '../middleware/uploadMiddleware.js';

// // 🔐 Import authentication middleware to verify JWT
// import authMiddleware from '../middleware/authMiddleware.js';

// // 📏 Import validation rules for student fields
// import { studentValidationRules } from '../validators/studentValidator.js';

// // 🛡️ Middleware to handle validation errors
// import validateRequest from '../middleware/validateRequest.js';

// // ============================
// // 🔐 Role-Based Access Control
// // ============================

// function authorizeRoles(...allowedRoles) {
//   return (req, res, next) => {
//     const userRole = req.user?.role;
//     if (!allowedRoles.includes(userRole)) {
//       return res.status(403).json({ error: 'Access denied: insufficient permissions' });
//     }
//     next();
//   };
// }

// // ============================
// // 🔐 Apply Auth Globally to All Routes
// // ============================

// router.use(authMiddleware);

// // ============================
// // 📚 Student Routes with Role-Based Access
// // ============================

// // 🆕 Create student → Only Admin and Teacher
// router.post(
//   '/',
//   authorizeRoles('admin', 'teacher'),
//   upload, // ✅ File upload middleware
//   studentValidationRules,
//   validateRequest,
//   createStudent
// );

// // 📄 Get all students → Admin, Teacher, Student
// router.get(
//   '/',
//   authorizeRoles('admin', 'teacher', 'student'),
//   getStudents
// );

// // 🔍 Get student by ID → Admin, Teacher, Student
// router.get(
//   '/:id',
//   authorizeRoles('admin', 'teacher', 'student'),
//   getStudentById
// );

// // ✏️ Update student → Only Admin and Teacher
// router.put(
//   '/:id',
//   authorizeRoles('admin', 'teacher'),
//   upload, // ✅ 🆕 Added file upload middleware
//   studentValidationRules,
//   validateRequest,
//   updateStudent
// );

// // ❌ Delete student → Only Admin and Teacher
// router.delete(
//   '/:id',
//   authorizeRoles('admin', 'teacher'),
//   deleteStudent
// );

// // 📤 Export the router to be used in main app
// export default router;



// // 📦 Import Express framework
// import express from 'express';

// // 🚀 Initialize Express Router
// const router = express.Router();

// // 📥 Import controller functions for student operations
// import {
//   createStudent,       // 🆕 Create a new student
//   getStudents,         // 📄 Get all students (with pagination)
//   getStudentById,      // 🔍 Get a student by ID
//   updateStudent,       // ✏️ Update student details
//   deleteStudent        // ❌ Delete a student
// } from '../controllers/studentController.js';

// // 🖼️ Import upload middleware for file uploads (Multer)
// import upload from '../middleware/uploadMiddleware.js';

// // 🔐 Import authentication middleware to verify JWT
// import authMiddleware from '../middleware/authMiddleware.js';

// // 📏 Import validation rules for student fields
// import { studentValidationRules } from '../validators/studentValidator.js';

// // 🛡️ Middleware to handle validation errors
// import validateRequest from '../middleware/validateRequest.js';

// // ============================
// // 🔐 Role-Based Access Control
// // ============================

// function authorizeRoles(...allowedRoles) {
//   return (req, res, next) => {
//     const userRole = req.user?.role;
//     if (!allowedRoles.includes(userRole)) {
//       return res.status(403).json({ error: 'Access denied: insufficient permissions' });
//     }
//     next();
//   };
// }

// // ============================
// // 🔐 Apply Auth Globally to All Routes
// // ============================

// router.use(authMiddleware); // ✅ All routes require valid JWT

// // ============================
// // 📚 Student Routes with Role-Based Access
// // ============================

// // 🆕 Create student → Only Admin and Teacher
// router.post(
//   '/',
//   authorizeRoles('admin', 'teacher'),     // 🔐 Role check
//   upload.single('photo'),                 // 🖼️ Handle photo upload
//   studentValidationRules,                 // 📏 Validate fields
//   validateRequest,                        // 🛡️ Handle validation errors
//   createStudent                           // 🧠 Controller logic
// );

// // 📄 Get all students → Admin, Teacher, Student
// router.get(
//   '/',
//   authorizeRoles('admin', 'teacher', 'student'),
//   getStudents
// );

// // 🔍 Get student by ID → Admin, Teacher, Student
// router.get(
//   '/:id',
//   authorizeRoles('admin', 'teacher', 'student'),
//   getStudentById
// );

// // ✏️ Update student → Only Admin and Teacher
// router.put(
//   '/:id',
//   authorizeRoles('admin', 'teacher'),     // 🔐 Role check
//   upload.single('photo'),                 // 🖼️ Handle new photo upload
//   studentValidationRules,                 // 📏 Validate fields
//   validateRequest,                        // 🛡️ Handle validation errors
//   updateStudent                           // 🧠 Controller logic
// );

// // ❌ Delete student → Only Admin and Teacher
// router.delete(
//   '/:id',
//   authorizeRoles('admin', 'teacher'),
//   deleteStudent
// );

// // 📤 Export the router to be used in main app
// export default router;




// 📦 Import Express framework
import express from 'express';
const router = express.Router();

// 📥 Import controller functions for student operations
import {
  createStudent,       // 🆕 Create a new student
  getStudents,         // 📄 Get all students (with pagination)
  getStudentById,      // 🔍 Get a student by ID
  updateStudent,       // ✏️ Update student details
  deleteStudent        // ❌ Delete a student
} from '../controllers/studentController.js';

// 🖼️ Import photo upload middleware (Multer)
import { photoUpload } from '../middleware/photoUpload.js';

// 🔐 Import authentication middleware to verify JWT
import authMiddleware from '../middleware/authMiddleware.js';

// 📏 Import validation rules for student fields
import { studentValidationRules } from '../validators/studentValidator.js';

// 🛡️ Middleware to handle validation errors
import validateRequest from '../middleware/validateRequest.js';

// ============================
// 🔐 Role-Based Access Control
// ============================

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }
    next();
  };
}

// ============================
// 🔐 Apply Auth Globally to All Routes
// ============================

router.use(authMiddleware); // ✅ All routes require valid JWT

// ============================
// 📚 Student Routes with Role-Based Access
// ============================

// 🆕 Create student → Only Admin and Teacher
router.post(
  '/',
  authorizeRoles('admin', 'teacher'),     // 🔐 Role check
  photoUpload,                            // 🖼️ Handle photo upload
  studentValidationRules,                 // 📏 Validate fields
  validateRequest,                        // 🛡️ Handle validation errors
  createStudent                           // 🧠 Controller logic
);

// 📄 Get all students → Admin, Teacher, Student
router.get(
  '/',
  authorizeRoles('admin', 'teacher', 'student'),
  getStudents
);

// 🔍 Get student by ID → Admin, Teacher, Student
router.get(
  '/:id',
  authorizeRoles('admin', 'teacher', 'student'),
  getStudentById
);

// ✏️ Update student → Only Admin and Teacher
router.put(
  '/:id',
  authorizeRoles('admin', 'teacher'),     // 🔐 Role check
  photoUpload,                            // 🖼️ Handle new photo upload
  studentValidationRules,                 // 📏 Validate fields
  validateRequest,                        // 🛡️ Handle validation errors
  updateStudent                           // 🧠 Controller logic
);

// ❌ Delete student → Only Admin and Teacher
router.delete(
  '/:id',
  authorizeRoles('admin', 'teacher'),
  deleteStudent
);

// 🚫 Fallback for unmatched routes
router.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 📤 Export the router to be used in main app
export default router;
