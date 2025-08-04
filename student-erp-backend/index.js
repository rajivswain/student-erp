
// 1. Import core packages
import express from 'express';                      // Line 1: Core Express framework
import dotenv from 'dotenv';                        // Line 2: For reading .env config
import cors from 'cors';                            // Line 3: To enable CORS (frontend access)

// 2. Load environment variables
dotenv.config();                                    // Line 6: Load variables from .env file

// 3. Import custom middlewares
import logger from './middleware/logger.js';        // Line 9: Custom request logger
import errorHandler from './middleware/errorHandler.js'; // Line 10: Custom global error handler

// 4. Import all routes
import authRoutes from './routes/authRoutes.js';          // Line 13: Auth (login/signup)
import studentRoutes from './routes/studentRoutes.js';    // Line 14: Student-related routes
import protectedRoutes from './routes/protectedRoutes.js';// Line 15: Protected routes
import adminRoutes from './routes/adminRoutes.js';        // Line 16: Admin-only routes
import testRoutes from './routes/testRoutes.js';          // Line 17: Testing routes

// 5. Initialize app
const app = express();                              // Line 20: Create Express app

// ============================
// 6. Middleware
// ============================
app.use(cors({                                      // Line 24: Enable CORS for frontend
  origin: [
    "http://localhost:5173",                        // Line 26: Vite frontend
    "http://localhost:3000"                         // Line 27: CRA frontend
  ],
  credentials: true                                 // Line 28: Allow cookies/auth headers
}));
app.use(express.json());                            // Line 30: Parse JSON body in requests
app.use(logger);                                    // Line 31: Log every request to console or file

// ============================
// 7. Health Check Route
// ============================
app.get('/', (req, res) => {                        // Line 35: Root path for quick status check
  res.status(200).json({
    message: '🚀 Student ERP Backend is running!',  // Line 37: Response for uptime check
    status: 'OK',
    version: '1.0.0'
  });
});

// ============================
// 8. API Routes
// ============================
app.use('/api/auth', authRoutes);                   // Line 44: Auth-related APIs
app.use('/api/students', studentRoutes);            // Line 45: Student CRUD and list
app.use('/api/protected', protectedRoutes);         // Line 46: Routes protected by auth
app.use('/api/admin', adminRoutes);                 // Line 47: Admin-only routes
app.use('/api/test', testRoutes);                   // Line 48: Test routes (e.g., role-based access)

// ============================
// 9. Global Error Handler
// ============================
app.use(errorHandler);                              // Line 52: Catch all unhandled errors

// ============================
// 10. Start the Server
// ============================
const PORT = process.env.PORT || 3001;              // Line 56: Use PORT from .env or fallback to 3001
app.listen(PORT, '0.0.0.0', () => {                  // Line 57: Start server & bind to all interfaces
  console.log(`✅ Server is running at http://localhost:${PORT}`); // Line 58: Log server status
});
