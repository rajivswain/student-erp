// src/services/studentsService.js

// 🌐 Base URL for student-related API endpoints
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/students`;

// 🔐 Auth headers using JWT token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

//
// 🧑‍🎓 STUDENT SERVICE FUNCTIONS
//

/**
 * 🔄 Create a new student
 * @param {Object} studentData - student form data
 * @returns {Promise<Object>} - created student
 */
export const createStudent = async (studentData) => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(studentData),
  });
  return response.json();
};

/**
 * 📥 Fetch all students
 * Used in: StudentList.jsx
 * @returns {Promise<Array>} - list of students
 */
export const fetchStudents = async () => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return response.json();
};

/**
 * 🔍 Fetch a single student by ID
 * Used in: EditStudentForm.jsx
 * @param {string} id - student ID
 * @returns {Promise<Object>} - student data
 */
export const fetchStudentById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return response.json();
};

/**
 * ✏️ Update a student by ID
 * Used in: EditStudentForm.jsx
 * @param {string} id - student ID
 * @param {Object} updatedData - updated student fields
 * @returns {Promise<Object>} - updated student
 */
export const updateStudent = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

/**
 * 🗑️ Delete a student by ID
 * Used in: StudentList.jsx
 * @param {string} id - student ID
 * @returns {Promise<Object>} - deletion result
 */
export const deleteStudent = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};
