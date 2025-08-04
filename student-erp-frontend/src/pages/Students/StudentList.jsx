
import React, { useEffect, useState } from 'react';
import { get, del } from '../../services/api';

function StudentsList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const data = await get('/students'); // This assumes your get() returns res.data
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students', err);
      }
    }
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await del(`/students/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Failed to delete student', err);
    }
  };

  return (
    <div>
      <h1>Students List</h1>
      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} ({student.email})
              <button onClick={() => handleDelete(student.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentsList;
