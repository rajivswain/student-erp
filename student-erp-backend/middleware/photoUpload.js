// middleware/photoUpload.js

import upload from './uploadMiddleware.js';

// 🖼️ Export a reusable middleware for single photo upload
export const photoUpload = upload.single('photo');
