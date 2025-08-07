// // Line 1: 📦 Import Supabase client
// import supabase from '../config/supabaseClient.js';

// // ============================
// // 🆕 Create a new student
// // ============================
// export async function createStudent(req, res) {
//   const studentData = req.body; // Line 4: 📥 Get student data from request body

//   // Line 6: 🧠 Insert student into 'students' table
//   const { data, error } = await supabase
//     .from('students')              // Line 7: 📌 Target 'students' table
//     .insert([studentData])         // Line 8: 📝 Insert new student
//     .select();                     // Line 9: 📤 Return inserted row

//   if (error) {
//     return res.status(500).json({ error: error.message }); // Line 12: ❌ Handle DB error
//   }

//   res.status(201).json({ student: data[0] }); // Line 14: ✅ Return created student
// }

// // ============================
// // 📄 Get all students
// // ============================
// export async function getStudents(req, res) {
//   const { data, error } = await supabase
//     .from('students')              // Line 19: 📌 Target 'students' table
//     .select('*')                   // Line 20: 📤 Select all fields
//     .order('created_at', { ascending: false }); // Line 21: 🕒 Sort by newest first

//   if (error) {
//     return res.status(500).json({ error: error.message }); // Line 24: ❌ Handle DB error
//   }

//   res.status(200).json({ students: data }); // Line 26: ✅ Return list of students
// }

// // ============================
// // 🔍 Get student by ID
// // ============================
// export async function getStudentById(req, res) {
//   const { id } = req.params; // Line 30: 🆔 Extract ID from URL

//   const { data, error } = await supabase
//     .from('students')              // Line 32: 📌 Target 'students' table
//     .select('*')                   // Line 33: 📤 Select all fields
//     .eq('id', id)                  // Line 34: 🔍 Filter by ID
//     .single();                     // Line 35: 🎯 Expect one result

//   if (error || !data) {            // ✳️ Line 37: ✅ Updated to check if `data` is null
//     return res.status(404).json({ error: 'Student not found' }); // Line 38: ❌ Handle not found
//   }

//   res.status(200).json({ student: data }); // Line 40: ✅ Return student
// }

// // ============================
// // ✏️ Update student
// // ============================
// export async function updateStudent(req, res) {
//   const { id } = req.params; // Line 44: 🆔 Extract ID from URL
//   const updates = req.body; // Line 45: 📝 Get updated fields

//   const { data, error } = await supabase
//     .from('students')              // Line 47: 📌 Target 'students' table
//     .update(updates)              // Line 48: ✳️ Apply updates
//     .eq('id', id)                 // Line 49: 🔍 Match by ID
//     .select();                    // Line 50: 📤 Return updated row

//   if (error || !data || data.length === 0) { // ✳️ Line 52: ✅ Improved error check for empty result
//     return res.status(500).json({ error: error?.message || 'Update failed' }); // Line 53: ❌ Handle DB error
//   }

//   res.status(200).json({ student: data[0] }); // Line 55: ✅ Return updated student
// }

// // ============================
// // ❌ Delete student
// // ============================
// export async function deleteStudent(req, res) {
//   const { id } = req.params; // Line 59: 🆔 Extract ID from URL

//   const { error, count } = await supabase         // ✳️ Line 61: ✅ Added `count` to verify deletion
//     .from('students')                             // Line 62: 📌 Target 'students' table
//     .delete()                                     // Line 63: 🗑️ Delete row
//     .eq('id', id);                                // Line 64: 🔍 Match by ID

//   if (error || count === 0) {                     // ✳️ Line 65: ✅ Check if deletion actually happened
//     return res.status(500).json({ error: error?.message || 'Deletion failed' }); // Line 66: ❌ Handle DB error
//   }

//   res.status(200).json({ message: 'Student deleted successfully' }); // Line 68: ✅ Confirm deletion
// }


// // Line 1: 📦 Import service functions from studentService
// import {
//   createStudentService,           // Line 2: 🧠 Handles DB insert
//   getAllStudentsService,          // Line 3: 📄 Fetches all students
//   getStudentByIdService,          // Line 4: 🔍 Fetches student by ID
//   updateStudentService,           // Line 5: ✏️ Updates student
//   deleteStudentService            // Line 6: ❌ Deletes student
// } from '../services/studentService.js';

// import { uploadStudentPhoto } from '../services/storageService.js'; // 🆕 Import upload helper

// // ============================
// // 🆕 Create a new student
// // ============================
// export async function createStudent(req, res) {
//   const studentData = req.body; // Line 10: 📥 Get student data from request body
//   const file = req.file; // 🆕 Extract uploaded file (via multer)

//   // 🆕 Upload photo if provided
//   if (file) {
//     try {
//       const photoUrl = await uploadStudentPhoto(file);
//       studentData.photo_url = photoUrl;
//     } catch (err) {
//       return res.status(500).json({ error: 'Photo upload failed' });
//     }
//   }

//   const { data, error } = await createStudentService(studentData); // ✳️ Line 12: ✅ Use service function

//   if (error) {
//     return res.status(500).json({ error: error.message }); // Line 15: ❌ Handle DB error
//   }

//   res.status(201).json({ student: data[0] }); // Line 17: ✅ Return created student
// }

// // ============================
// // 📄 Get all students
// // ============================
// // export async function getStudents(req, res) {
// //   const { data, error } = await getAllStudentsService(); // ✳️ Line 22: ✅ Use service function

// //   if (error) {
// //     return res.status(500).json({ error: error.message }); // Line 25: ❌ Handle DB error
// //   }

// //   res.status(200).json({ students: data }); // Line 27: ✅ Return list of students
// // }

// export async function getStudents(req, res) {
//   const { 
//     name, 
//     roll_number,
//     class: className,
//     section,
//     gender,
//     page,
//     limit,
//     sort_by,
//     order 
//   } = req.query; // 🔄 UPDATED: Extract all filters from query

//   const { data, error } = await getAllStudentsService({ 
//     name, 
//     roll_number,
//     class: className,
//     section,
//     gender,
//     page: Number(page),
//     limit: Number(limit),
//     sort_by,
//     order  
//   }); // 🔄 UPDATED: Pass filters to service

//   if (error) {
//     return res.status(500).json({ error: error.message }); // Line 25: ❌ Handle DB error
//   }

//   res.status(200).json({ students: data }); // Line 27: ✅ Return list of students
// }


// // ============================
// // 🔍 Get student by ID
// // ============================
// export async function getStudentById(req, res) {
//   const { id } = req.params; // Line 32: 🆔 Extract ID from URL

//   const { data, error } = await getStudentByIdService(id); // ✳️ Line 34: ✅ Use service function

//   if (error || !data) {
//     return res.status(404).json({ error: 'Student not found' }); // Line 37: ❌ Handle not found
//   }

//   res.status(200).json({ student: data }); // Line 39: ✅ Return student
// }

// // ============================
// // ✏️ Update student
// // ============================
// export async function updateStudent(req, res) {
//   const { id } = req.params; // Line 44: 🆔 Extract ID from URL
//   const updates = req.body; // Line 45: 📝 Get updated fields

//   const { data, error } = await updateStudentService(id, updates); // ✳️ Line 47: ✅ Use service function

//   if (error || !data || data.length === 0) {
//     return res.status(500).json({ error: error?.message || 'Update failed' }); // Line 50: ❌ Handle DB error
//   }

//   res.status(200).json({ student: data[0] }); // Line 52: ✅ Return updated student
// }

// // ============================
// // ❌ Delete student
// // ============================
// export async function deleteStudent(req, res) {
//   const { id } = req.params; // Line 57: 🆔 Extract ID from URL

//   const { error, count } = await deleteStudentService(id); // ✳️ Line 59: ✅ Use service function

//   if (error || count === 0) {
//     return res.status(500).json({ error: error?.message || 'Deletion failed' }); // Line 62: ❌ Handle DB error
//   }

//   res.status(200).json({ message: 'Student deleted successfully' }); // Line 64: ✅ Confirm deletion
// }


// Line 1: 📦 Import service functions from studentService
import {
  createStudentService,           // Line 2: 🧠 Handles DB insert
  getAllStudentsService,          // Line 3: 📄 Fetches all students
  getStudentByIdService,          // Line 4: 🔍 Fetches student by ID
  updateStudentService,           // Line 5: ✏️ Updates student
  deleteStudentService            // Line 6: ❌ Deletes student
} from '../services/studentService.js';

import { uploadStudentPhoto } from '../services/storageService.js'; // 🆕 Import upload helper

// ============================
// 🆕 Create a new student
// ============================
export async function createStudent(req, res) {
  const studentData = req.body; // Line 10: 📥 Get student data from request body
  const file = req.file; // 🆕 Extract uploaded file (via multer)

  // 🆕 Upload photo if provided
  if (file) {
    try {
      const photoUrl = await uploadStudentPhoto(file);
      studentData.photo_url = photoUrl;
    } catch (err) {
      return res.status(500).json({ error: 'Photo upload failed' });
    }
  }

  const { data, error } = await createStudentService(studentData); // ✳️ Line 12: ✅ Use service function

  if (error) {
    return res.status(500).json({ error: error.message }); // Line 15: ❌ Handle DB error
  }

  res.status(201).json({ student: data[0] }); // Line 17: ✅ Return created student
}

// ============================
// 📄 Get all students
// ============================
export async function getStudents(req, res) {
  const { 
    name, 
    roll_number,
    class: className,
    section,
    gender,
    page,
    limit,
    sort_by,
    order 
  } = req.query; // 🔄 UPDATED: Extract all filters from query

  const { data, error } = await getAllStudentsService({ 
    name, 
    roll_number,
    class: className,
    section,
    gender,
    page: Number(page),
    limit: Number(limit),
    sort_by,
    order  
  }); // 🔄 UPDATED: Pass filters to service

  if (error) {
    return res.status(500).json({ error: error.message }); // Line 25: ❌ Handle DB error
  }

  res.status(200).json({ students: data }); // Line 27: ✅ Return list of students
}

// ============================
// 🔍 Get student by ID
// ============================
export async function getStudentById(req, res) {
  const { id } = req.params; // Line 32: 🆔 Extract ID from URL

  const { data, error } = await getStudentByIdService(id); // ✳️ Line 34: ✅ Use service function

  if (error || !data) {
    return res.status(404).json({ error: 'Student not found' }); // Line 37: ❌ Handle not found
  }

  res.status(200).json({ student: data }); // Line 39: ✅ Return student
}

// ============================
// ✏️ Update student
// ============================
export async function updateStudent(req, res) {
  const { id } = req.params; // Line 44: 🆔 Extract ID from URL
  const updates = req.body; // Line 45: 📝 Get updated fields
  const file = req.file; // 🆕 Extract uploaded file (via multer)

  // 🆕 Upload new photo if provided
  if (file) {
    try {
      const photoUrl = await uploadStudentPhoto(file);
      updates.photo_url = photoUrl;
    } catch (err) {
      return res.status(500).json({ error: 'Photo upload failed' });
    }
  }

  const { data, error } = await updateStudentService(id, updates); // ✳️ Line 47: ✅ Use service function

  if (error || !data || data.length === 0) {
    return res.status(500).json({ error: error?.message || 'Update failed' }); // Line 50: ❌ Handle DB error
  }

  res.status(200).json({ student: data[0] }); // Line 52: ✅ Return updated student
}

// ============================
// ❌ Delete student
// ============================
export async function deleteStudent(req, res) {
  const { id } = req.params; // Line 57: 🆔 Extract ID from URL

  const { error, count } = await deleteStudentService(id); // ✳️ Line 59: ✅ Use service function

  if (error || count === 0) {
    return res.status(500).json({ error: error?.message || 'Deletion failed' }); // Line 62: ❌ Handle DB error
  }

  res.status(200).json({ message: 'Student deleted successfully' }); // Line 64: ✅ Confirm deletion
}


