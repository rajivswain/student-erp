// Line 1: Import express
import express from 'express';

const router = express.Router(); // Line 3: Initialize express router

// Line 5: Sample route - You can expand this based on your student features
router.get('/', (req, res) => {
  res.status(200).json({
    message: '📚 Student route working!',
    status: 'success',
  });
});

// Line 11: Export the router using ESM syntax
export default router;
