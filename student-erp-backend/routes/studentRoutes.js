// // Line 1: Import express
// import express from 'express';

// const router = express.Router(); // Line 3: Initialize express router

// // Line 5: Sample route - You can expand this based on your student features
// router.get('/', (req, res) => {
//   res.status(200).json({
//     message: '📚 Student route working!',
//     status: 'success',
//   });
// });

// // Line 11: Export the router using ESM syntax
// export default router;



// Import Express
import express from 'express';
// Import controller functions
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';

import authMiddleware from '../middleware/authMiddleware.js';

// Create router instance
const router = express.Router();

// Role-based middleware
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }
    next();
  };
}

// Define routes 

// Apply auth to all routes
router.use(authMiddleware);

// ✅ Create student (Admin only)
router.post('/', authorizeRoles('admin'), createStudent);

// 📄 Get all students (Admin, Teacher)
router.get('/', authorizeRoles('admin', 'teacher'), getAllStudents);

// 🔍 Get student by ID (Admin, Teacher)
router.get('/:id', authorizeRoles('admin', 'teacher'), getStudentById);

// ✏️ Update student (Admin only)
router.put('/:id', authorizeRoles('admin'), updateStudent);

// ❌ Delete student (Admin only)
router.delete('/:id', authorizeRoles('admin'), deleteStudent);

export default router;
