
// // src/components/Students/StudentList.jsx

// import React, { useEffect, useState } from 'react';
// import { fetchStudents, deleteStudent } from '../../services/studentsService';
// import { Link } from 'react-router-dom';
// import { isAdminOrTeacher } from '../../utils/authUtils'; // 🔐 Role check helper

// const StudentList = () => {
//   // 🧠 State: holds all students fetched from API
//   const [students, setStudents] = useState([]);

//   // 🔍 State: search input value
//   const [searchTerm, setSearchTerm] = useState('');

//   // 📄 State: pagination control
//   const [currentPage, setCurrentPage] = useState(1);
//   const studentsPerPage = 10;

//   // 📦 Fetch students on component mount
//   useEffect(() => {
//     loadStudents();
//   }, []);

//   /**
//    * 🔄 Fetch all students from API and store in state
//    * Used on initial load and after updates
//    */
//   const loadStudents = async () => {
//     const data = await fetchStudents(); // API call
//     setStudents(data); // Update state
//   };

//   /**
//    * 🗑️ Delete a student by ID (Admin/Teacher only)
//    * Shows confirmation before deletion
//    */
//   const handleDelete = async (id) => {
//     const confirm = window.confirm('Are you sure you want to delete this student?');
//     if (!confirm) return;

//     try {
//       await deleteStudent(id);
//       alert('Student deleted successfully!');
//       loadStudents(); // Refresh list
//     } catch (error) {
//       console.error('Delete failed:', error);
//       alert('Failed to delete student.');
//     }
//   };

//   /**
//    * 🔍 Filter students by search term (case-insensitive)
//    * Used to narrow down visible students
//    */
//   const filteredStudents = students.filter(student =>
//     student.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // 📄 Pagination logic
//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
//   const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

//   /**
//    * 🔁 Change current page
//    * Used when clicking pagination buttons
//    */
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div>
//       <h2>Students List</h2>

//       {/* 🔍 Search Input */}
//       <input
//         type="text"
//         placeholder="Search by name"
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setCurrentPage(1); // Reset to first page on search
//         }}
//       />

//       {/* ➕ Add Button (Admin/Teacher only) */}
//       {isAdminOrTeacher() && (
//         <Link to="/students/add">
//           <button style={{ marginTop: '1rem' }}>Add Student</button>
//         </Link>
//       )}

//       {/* 📋 Students Table */}
//       <table border="1" cellPadding="8" style={{ marginTop: '1rem', width: '100%' }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Roll No</th>
//             <th>Class</th>
//             <th>Section</th>
//             <th>DOB</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Guardian</th>
//             {isAdminOrTeacher() && <th>Actions</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {currentStudents.map(student => (
//             <tr key={student.id}>
//               <td>{student.name}</td>
//               <td>{student.roll_number}</td>
//               <td>{student.class}</td>
//               <td>{student.section}</td>
//               <td>{student.dob}</td>
//               <td>{student.email}</td>
//               <td>{student.phone}</td>
//               <td>{student.guardian_name}</td>
//               {isAdminOrTeacher() && (
//                 <td>
//                   {/* ✏️ Edit Button */}
//                   <Link to={`/students/edit/${student.id}`}>Edit</Link>{' '}
//                   {/* 🗑️ Delete Button */}
//                   <button
//                     onClick={() => handleDelete(student.id)}
//                     style={{ marginLeft: '8px', color: 'red' }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* 📄 Pagination Controls */}
//       <div style={{ marginTop: '1rem' }}>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => handlePageChange(i + 1)}
//             style={{
//               marginRight: '5px',
//               backgroundColor: currentPage === i + 1 ? '#007bff' : '#f0f0f0',
//               color: currentPage === i + 1 ? '#fff' : '#000'
//             }}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentList;

import React, { useEffect, useState } from 'react';
import { fetchStudents, deleteStudent } from '../../services/studentsService';
import { Link } from 'react-router-dom';
import { isAdminOrTeacher } from '../../utils/authUtils';
import {
  exportToCSV,
  exportToExcel,
  exportToJSON,
  exportToPDF,
} from '../../utils/exportUtils'; // 📦 Export helpers

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await fetchStudents();
    setStudents(data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this student?');
    if (!confirm) return;

    try {
      await deleteStudent(id);
      alert('Student deleted successfully!');
      loadStudents();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete student.');
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleExport = (type) => {
    switch (type) {
      case 'csv':
        exportToCSV(filteredStudents, 'students.csv');
        break;
      case 'excel':
        exportToExcel(filteredStudents, 'students.xlsx');
        break;
      case 'json':
        exportToJSON(filteredStudents, 'students.json');
        break;
      case 'pdf':
        exportToPDF(filteredStudents, 'students.pdf');
        break;
      default:
        console.warn('Unknown export type:', type);
    }
  };

  return (
    <div>
      <h2>Students List</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* 📤 Export Buttons */}
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => handleExport('csv')}>Export CSV</button>
        <button onClick={() => handleExport('excel')}>Export Excel</button>
        <button onClick={() => handleExport('json')}>Export JSON</button>
        <button onClick={() => handleExport('pdf')}>Export PDF</button>
      </div>

      {/* ➕ Add Button */}
      {isAdminOrTeacher() && (
        <Link to="/students/add">
          <button style={{ marginBottom: '1rem' }}>Add Student</button>
        </Link>
      )}

      {/* 📋 Students Table */}
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Section</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Guardian</th>
            {isAdminOrTeacher() && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentStudents.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.roll_number}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.dob}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.guardian_name}</td>
              {isAdminOrTeacher() && (
                <td>
                  <Link to={`/students/edit/${student.id}`}>Edit</Link>{' '}
                  <button
                    onClick={() => handleDelete(student.id)}
                    style={{ marginLeft: '8px', color: 'red' }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📄 Pagination Controls */}
      <div style={{ marginTop: '1rem' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            style={{
              marginRight: '5px',
              backgroundColor: currentPage === i + 1 ? '#007bff' : '#f0f0f0',
              color: currentPage === i + 1 ? '#fff' : '#000'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
