import React, { useEffect, useState } from 'react';
import {
  fetchStudents,
  createStudent,
  fetchStudentById,
  updateStudent,
  deleteStudent
} from '../services/studentsService';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch all students on mount
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await fetchStudents();
    setStudents(data);
  };

  const handleAddStudent = async () => {
    const newStudent = { name: 'Ravi', age: 20 };
    const result = await createStudent(newStudent);
    console.log('Student added:', result);
    setStudents(prev => [...prev, result]);
  };

  const handleFetchById = async () => {
    if (!selectedId) return;
    const student = await fetchStudentById(selectedId);
    console.log('Fetched student:', student);
  };

  const handleUpdateStudent = async () => {
    if (!selectedId) return;
    const updatedData = { name: 'Updated Name', age: 22 };
    const result = await updateStudent(selectedId, updatedData);
    console.log('Student updated:', result);
    loadStudents(); // Refresh list
  };

  const handleDeleteStudent = async () => {
    if (!selectedId) return;
    await deleteStudent(selectedId);
    console.log('Student deleted');
    loadStudents(); // Refresh list
  };

  return (
    <div>
      <h2>Student List</h2>

      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} ({student.age})
            <button onClick={() => setSelectedId(student.id)}>Select</button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleAddStudent}>Add Student</button>
        <button onClick={handleFetchById}>Fetch by ID</button>
        <button onClick={handleUpdateStudent}>Update Selected</button>
        <button onClick={handleDeleteStudent}>Delete Selected</button>
      </div>

      {selectedId && <p>Selected Student ID: {selectedId}</p>}
    </div>
  );
};

export default Students;
