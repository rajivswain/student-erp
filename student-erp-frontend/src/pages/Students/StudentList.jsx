
// import React, { useEffect, useState } from 'react';
// import { get, del } from '../../services/api';

// function StudentsList() {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     async function fetchStudents() {
//       try {
//         const data = await get('/students'); // This assumes your get() returns res.data
//         setStudents(data);
//       } catch (err) {
//         console.error('Error fetching students', err);
//       }
//     }
//     fetchStudents();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this student?')) return;
//     try {
//       await del(`/students/${id}`);
//       setStudents((prev) => prev.filter((s) => s.id !== id));
//     } catch (err) {
//       console.error('Failed to delete student', err);
//     }
//   };

//   return (
//     <div>
//       <h1>Students List</h1>
//       {students.length === 0 ? (
//         <p>No students found</p>
//       ) : (
//         <ul>
//           {students.map((student) => (
//             <li key={student.id}>
//               {student.name} ({student.email})
//               <button onClick={() => handleDelete(student.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default StudentsList;




import React, { useEffect, useState } from 'react';
import { get, del } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudents() {
      try {
        const data = await get('/students');
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students', err);
        setError('Failed to load students');
      } finally {
        setLoading(false);
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
      alert('Could not delete student');
    }
  };

  const handleEdit = (id) => {
    navigate(`/students/edit/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>

      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <ul className="space-y-4">
          {students.map((student) => (
            <li
              key={student.id}
              className="border p-4 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{student.name}</p>
                <p className="text-sm text-gray-600">{student.email}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(student.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;
