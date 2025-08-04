// Without ES Module Standard


// const express = require('express');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();

// // ============================
// // @route   GET /api/protected
// // @desc    Protected route - requires valid JWT
// // @access  Private
// // ============================
// router.get('/protected', authMiddleware, (req, res) => {
//   res.json({
//     message: `Hello, user ${req.user.userId}`,
//     role: req.user.role
//   });
// });

// module.exports = router;



// With ES Module Standard

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; // ✅ Include .js extension

const router = express.Router();

// ============================
// @route   GET /api/protected
// @desc    Protected route - requires valid JWT
// @access  Private
// ============================
router.get('/protected', authMiddleware, (req, res) => {
  res.json({
    message: `Hello, user ${req.user.userId}`,
    role: req.user.role
  });
});

export default router;

