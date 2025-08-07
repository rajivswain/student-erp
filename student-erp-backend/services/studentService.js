// // services/studentService.js

// import supabase from '../config/supabaseClient.js';

// // 🆕 Create a student
// export async function createStudentService(studentData) {
//   return await supabase
//     .from('students')
//     .insert([studentData])
//     .select();
// }

// // 📄 Get all students
// export async function getAllStudentsService() {
//   return await supabase
//     .from('students')
//     .select('*')
//     .order('created_at', { ascending: false });
// }

// // 🔍 Get student by ID
// export async function getStudentByIdService(id) {
//   return await supabase
//     .from('students')
//     .select('*')
//     .eq('id', id)
//     .single();
// }

// // ✏️ Update student
// export async function updateStudentService(id, updates) {
//   return await supabase
//     .from('students')
//     .update(updates)
//     .eq('id', id)
//     .select();
// }

// // ❌ Delete student
// export async function deleteStudentService(id) {
//   return await supabase
//     .from('students')
//     .delete()
//     .eq('id', id);
// }




import supabase from '../config/supabaseClient.js';

// 🆕 Create a student
export async function createStudentService(studentData) {
  return await supabase
    .from('students')
    .insert([studentData])
    .select();
}

// 📄 Get all students (with filters + pagination)
export async function getAllStudentsService(filters = {}) {
  const {
    name,
    roll_number,
    class: className,
    section,
    gender,
    page = 1,
    limit = 10,
    sort_by = 'created_at',   // 🆕 Default sort field
    order = 'desc'            // 🆕 Default sort order
  } = filters;

  let query = supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false });

  // 🔍 Apply search filters
  if (name) {
    query = query.ilike('name', `%${name}%`);
  }

  if (roll_number) {
    query = query.eq('roll_number', roll_number);
  }

  // 🏫 Apply additional filters
  if (className) {
    query = query.eq('class', className);
  }

  if (section) {
    query = query.eq('section', section);
  }

  if (gender) {
    query = query.eq('gender', gender);
  }

  // 🔀 Apply sorting
  if (['name', 'roll_number', 'created_at'].includes(sort_by)) {
    query = query.order(sort_by, { ascending: order === 'asc' });
  }
  
  // 📦 Apply pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  return await query;
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
