// routes/adminRoutes.js

// Without ES Module Standard

// const express = require('express');
// const authMiddleware = require('../middleware/authMiddleware');
// const authorizeRole = require('../middleware/authorizeRole'); // ✅ Match the filename in middleware folder

// const router = express.Router();

// router.get('/dashboard',
//   authMiddleware,            // 1. Check if user is authenticated
//   authorizeRole(['admin']),  // 2. Check if user role is 'admin'
//   (req, res) => {
//     res.json({
//       message: 'Welcome Admin!',
//       user: req.user
//     });
//   }
// );

// module.exports = router;



// With ES Module Standard

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import authorizeRole from '../middleware/authorizeRole.js'; // ✅ Ensure .js is included for ESM

const router = express.Router();

router.get(
  '/dashboard',
  authMiddleware,            // 1. Check if user is authenticated
  authorizeRole(['admin']),  // 2. Check if user role is 'admin'
  (req, res) => {
    res.json({
      message: 'Welcome Admin!',
      user: req.user
    });
  }
);

export default router;
