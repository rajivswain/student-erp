
// Without ESM Standard


// const express = require('express');
// const authMiddleware = require('../middleware/authMiddleware');
// const authorizeRole = require('../middleware/authorizeRole');

// const router = express.Router();

// /**
//  * GET /api/test
//  * Accessible only by users with role 'admin'
//  */
// router.get('/',
//   authMiddleware,             // Step 1: verify JWT
//   authorizeRole(['admin']),   // Step 2: check role
//   (req, res) => {             // Step 3: route handler
//     res.json({
//       message: 'This is a protected admin-only route!',
//       user: req.user
//     });
//   }
// );

// module.exports = router;


// With ESM Standard


import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import authorizeRole from '../middleware/authorizeRole.js';

const router = express.Router();

/**
 * GET /api/test
 * Accessible only by users with role 'admin'
 */
router.get(
  '/',
  authMiddleware,             // Step 1: verify JWT
  authorizeRole(['admin']),   // Step 2: check role
  (req, res) => {             // Step 3: route handler
    res.json({
      message: 'This is a protected admin-only route!',
      user: req.user
    });
  }
);

export default router;
