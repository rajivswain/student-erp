// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import StudentProfile from '../../components/students/StudentProfile';
// import { getStudentById } from '../../services/studentService';

// const StudentProfilePage = () => {
//   const { id } = useParams();
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudent = async () => {
//       const data = await getStudentById(id);
//       setStudent(data);
//       setLoading(false);
//     };
//     fetchStudent();
//   }, [id]);

//   if (loading) return <p>Loading student profile...</p>;
//   if (!student) return <p>Student not found.</p>;

//   return <StudentProfile student={student} />;
// };

// export default StudentProfilePage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StudentProfile from '../../components/students/StudentProfile';
import { getStudentById } from '../../services/studentService';

const StudentProfilePage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        if (!data) {
          setError('Student not found');
        } else {
          setStudent(data);
        }
      } catch (err) {
        console.error('Error fetching student:', err);
        setError('Failed to load student profile');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <div className="loader">Loading student profile...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1>Student Profile</h1>
      <StudentProfile student={student} />
    </div>
  );
};

export default StudentProfilePage;

