import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentList from '../../components/students/StudentList';
import { fetchStudents } from '../../services/studentService';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load student list.');
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const handleSelect = (id) => {
    navigate(`/students/${id}`);
  };

  if (loading) return <p className="text-gray-500">Loading students...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Student List</h1>
      <StudentList students={students} onSelect={handleSelect} />
    </div>
  );
};

export default StudentListPage;
