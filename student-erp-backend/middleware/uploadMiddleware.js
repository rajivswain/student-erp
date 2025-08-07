// middleware/uploadMiddleware.js

import multer from 'multer';

const storage = multer.memoryStorage(); // 🧠 Store in memory for Supabase upload
const upload = multer({ storage });

export default upload.single('photo'); // Expect field name 'photo'
