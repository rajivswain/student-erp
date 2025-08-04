// Line 1: Import Supabase client
import supabase from '../utils/supabaseClient.js';

// Line 3: Create a new student
export async function createStudent(req, res) {
  const studentData = req.body; // Line 4: Get student data from request body

  // Line 6: Insert into Supabase 'students' table
  const { data, error } = await supabase
    .from('students')
    .insert([studentData])
    .select(); // Line 9: Return inserted row

  if (error) {
    return res.status(500).json({ error: error.message }); // Line 12: Handle DB error
  }

  res.status(201).json({ student: data[0] }); // Line 14: Return created student
}

// Line 17: Get all students
export async function getStudents(req, res) {
  const { data, error } = await supabase
    .from('students')
    .select('*') // Line 20: Select all fields
    .order('created_at', { ascending: false }); // Line 21: Sort by newest first

  if (error) {
    return res.status(500).json({ error: error.message }); // Line 24: Handle DB error
  }

  res.status(200).json({ students: data }); // Line 26: Return list of students
}

// Line 29: Get student by ID
export async function getStudentById(req, res) {
  const { id } = req.params; // Line 30: Extract ID from URL

  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id) // Line 34: Filter by ID
    .single(); // Line 35: Expect one result

  if (error) {
    return res.status(404).json({ error: 'Student not found' }); // Line 38: Handle not found
  }

  res.status(200).json({ student: data }); // Line 40: Return student
}

// Line 43: Update student
export async function updateStudent(req, res) {
  const { id } = req.params; // Line 44: Extract ID from URL
  const updates = req.body; // Line 45: Get updated fields

  const { data, error } = await supabase
    .from('students')
    .update(updates) // Line 48: Apply updates
    .eq('id', id)
    .select(); // Line 50: Return updated row

  if (error) {
    return res.status(500).json({ error: error.message }); // Line 53: Handle DB error
  }

  res.status(200).json({ student: data[0] }); // Line 55: Return updated student
}

// Line 58: Delete student
export async function deleteStudent(req, res) {
  const { id } = req.params; // Line 59: Extract ID from URL

  const { error } = await supabase
    .from('students')
    .delete() // Line 62: Delete row
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message }); // Line 66: Handle DB error
  }

  res.status(200).json({ message: 'Student deleted successfully' }); // Line 68: Confirm deletion
}
