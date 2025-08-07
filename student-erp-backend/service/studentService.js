// services/studentService.js

import supabase from '../config/supabaseClient.js';

// 🆕 Create a student
export async function createStudentService(studentData) {
  return await supabase
    .from('students')
    .insert([studentData])
    .select();
}

// 📄 Get all students
export async function getAllStudentsService() {
  return await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false });
}

// 🔍 Get student by ID
export async function getStudentByIdService(id) {
  return await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single();
}

// ✏️ Update student
export async function updateStudentService(id, updates) {
  return await supabase
    .from('students')
    .update(updates)
    .eq('id', id)
    .select();
}

// ❌ Delete student
export async function deleteStudentService(id) {
  return await supabase
    .from('students')
    .delete()
    .eq('id', id);
}
