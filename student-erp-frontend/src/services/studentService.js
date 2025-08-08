// // src/services/studentsService.js

// // 🌐 Base URL for student-related API endpoints
// const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/students`;

// // 🔐 Auth headers using JWT token from localStorage
// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   };
// };

// //
// // 🧑‍🎓 STUDENT SERVICE FUNCTIONS
// //

// /**
//  * 🔄 Create a new student
//  * @param {Object} studentData - student form data
//  * @returns {Promise<Object>} - created student
//  */
// export const createStudent = async (studentData) => {
//   const response = await fetch(`${BASE_URL}`, {
//     method: 'POST',
//     headers: getAuthHeaders(),
//     body: JSON.stringify(studentData),
//   });
//   return response.json();
// };

// /**
//  * 📥 Fetch all students
//  * Used in: StudentList.jsx
//  * @returns {Promise<Array>} - list of students
//  */
// export const fetchStudents = async () => {
//   const response = await fetch(`${BASE_URL}`, {
//     method: 'GET',
//     headers: getAuthHeaders(),
//   });
//   return response.json();
// };

// /**
//  * 🔍 Fetch a single student by ID
//  * Used in: EditStudentForm.jsx
//  * @param {string} id - student ID
//  * @returns {Promise<Object>} - student data
//  */
// export const fetchStudentById = async (id) => {
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     method: 'GET',
//     headers: getAuthHeaders(),
//   });
//   return response.json();
// };

// /**
//  * ✏️ Update a student by ID
//  * Used in: EditStudentForm.jsx
//  * @param {string} id - student ID
//  * @param {Object} updatedData - updated student fields
//  * @returns {Promise<Object>} - updated student
//  */
// export const updateStudent = async (id, updatedData) => {
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     method: 'PUT',
//     headers: getAuthHeaders(),
//     body: JSON.stringify(updatedData),
//   });
//   return response.json();
// };

// /**
//  * 🗑️ Delete a student by ID
//  * Used in: StudentList.jsx
//  * @param {string} id - student ID
//  * @returns {Promise<Object>} - deletion result
//  */
// export const deleteStudent = async (id) => {
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     method: 'DELETE',
//     headers: getAuthHeaders(),
//   });
//   return response.json();
// };




// // 🌐 Base URL for student-related API endpoints
// const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/students`;

// // 🔐 Auth headers using JWT token from localStorage
// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   };
// };

// //
// // 🧑‍🎓 STUDENT SERVICE FUNCTIONS
// //

// /**
//  * 🆕 Create a new student
//  * @param {Object} studentData - Form data for new student
//  * @returns {Promise<Object|null>} - Created student or null on error
//  */
// export const createStudent = async (studentData) => {
//   try {
//     const response = await fetch(`${BASE_URL}`, {
//       method: 'POST',
//       headers: getAuthHeaders(),
//       body: JSON.stringify(studentData),
//     });

//     if (!response.ok) throw new Error('Failed to create student');
//     return await response.json();
//   } catch (error) {
//     console.error('createStudent error:', error);
//     return null;
//   }
// };

// /**
//  * 📋 Fetch all students
//  * Used in: StudentList.jsx
//  * @returns {Promise<Array>} - Array of student objects
//  */
// export const fetchAllStudents = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}`, {
//       method: 'GET',
//       headers: getAuthHeaders(),
//     });

//     if (!response.ok) throw new Error('Failed to fetch students');
//     return await response.json();
//   } catch (error) {
//     console.error('fetchAllStudents error:', error);
//     return [];
//   }
// };

// /**
//  * 🔍 Fetch a single student by ID
//  * Used in: EditStudentForm.jsx, StudentProfilePage.jsx
//  * @param {string} studentId - Unique student ID
//  * @returns {Promise<Object|null>} - Student object or null
//  */
// export const fetchStudentById = async (studentId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${studentId}`, {
//       method: 'GET',
//       headers: getAuthHeaders(),
//     });

//     if (!response.ok) throw new Error(`Failed to fetch student with ID ${studentId}`);
//     return await response.json();
//   } catch (error) {
//     console.error('fetchStudentById error:', error);
//     return null;
//   }
// };

// /**
//  * ✏️ Update a student by ID
//  * Used in: EditStudentForm.jsx
//  * @param {string} studentId - Unique student ID
//  * @param {Object} updatedData - Fields to update
//  * @returns {Promise<Object|null>} - Updated student or null
//  */
// export const updateStudentById = async (studentId, updatedData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${studentId}`, {
//       method: 'PUT',
//       headers: getAuthHeaders(),
//       body: JSON.stringify(updatedData),
//     });

//     if (!response.ok) throw new Error(`Failed to update student with ID ${studentId}`);
//     return await response.json();
//   } catch (error) {
//     console.error('updateStudentById error:', error);
//     return null;
//   }
// };

// /**
//  * 🗑️ Delete a student by ID
//  * Used in: StudentList.jsx
//  * @param {string} studentId - Unique student ID
//  * @returns {Promise<boolean>} - True if deleted, false otherwise
//  */
// export const deleteStudentById = async (studentId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${studentId}`, {
//       method: 'DELETE',
//       headers: getAuthHeaders(),
//     });

//     if (!response.ok) throw new Error(`Failed to delete student with ID ${studentId}`);
//     return true;
//   } catch (error) {
//     console.error('deleteStudentById error:', error);
//     return false;
//   }
// };


// 📁 src/services/studentService.js

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
 * 🆕 Create a new student
 * @param {Object} studentData - Form data for new student
 * @returns {Promise<Object|null>} - Created student or null on error
 */
export const createStudent = async (studentData) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(studentData),
    });

    if (!response.ok) throw new Error('Failed to create student');
    return await response.json();
  } catch (error) {
    console.error('createStudent error:', error);
    return null;
  }
};

/**
 * 📋 Fetch all students
 * Used in: StudentList.jsx
 * @returns {Promise<Array>} - Array of student objects
 */
export const fetchAllStudents = async () => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error('Failed to fetch students');
    return await response.json();
  } catch (error) {
    console.error('fetchAllStudents error:', error);
    return [];
  }
};

/**
 * 🔍 Fetch a single student by ID
 * Used in: EditStudentForm.jsx, StudentProfilePage.jsx
 * @param {string} studentId - Unique student ID
 * @returns {Promise<Object|null>} - Student object or null
 */
export const fetchStudentById = async (studentId) => {
  try {
    const response = await fetch(`${BASE_URL}/${studentId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error(`Failed to fetch student with ID ${studentId}`);
    return await response.json();
  } catch (error) {
    console.error('fetchStudentById error:', error);
    return null;
  }
};

/**
 * ✏️ Update a student by ID
 * Used in: EditStudentForm.jsx
 * @param {string} studentId - Unique student ID
 * @param {Object} updatedData - Fields to update
 * @returns {Promise<Object|null>} - Updated student or null
 */
export const updateStudentById = async (studentId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${studentId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error(`Failed to update student with ID ${studentId}`);
    return await response.json();
  } catch (error) {
    console.error('updateStudentById error:', error);
    return null;
  }
};

/**
 * 🗑️ Delete a student by ID
 * Used in: StudentList.jsx
 * @param {string} studentId - Unique student ID
 * @returns {Promise<boolean>} - True if deleted, false otherwise
 */
export const deleteStudentById = async (studentId) => {
  try {
    const response = await fetch(`${BASE_URL}/${studentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error(`Failed to delete student with ID ${studentId}`);
    return true;
  } catch (error) {
    console.error('deleteStudentById error:', error);
    return false;
  }
};

/**
 * 📥 Bulk insert students from CSV/Excel
 * Used in: ImportForm.jsx
 * @param {Array<Object>} students - Array of student objects
 * @returns {Promise<Object>} - Success status and inserted data or error
 */
export const bulkInsertStudents = async (students) => {
  try {
    const response = await fetch(`${BASE_URL}/bulk`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(students),
    });

    if (!response.ok) throw new Error('Bulk insert failed');
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('bulkInsertStudents error:', error);
    return { success: false, error: error.message };
  }
};
