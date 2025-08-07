// src/components/Students/EditStudentForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStudentById, updateStudent } from '../../services/studentsService';

const EditStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const loadStudent = async () => {
      const student = await fetchStudentById(id);
      setFormData(student);
    };
    loadStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(id, formData);
      alert('Student updated successfully!');
      navigate('/students');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update student.');
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Student</h2>

      <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="roll_number" value={formData.roll_number} onChange={handleChange} required />
      <input type="text" name="class" value={formData.class} onChange={handleChange} required />
      <input type="text" name="section" value={formData.section} onChange={handleChange} required />
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      <input type="text" name="guardian_name" value={formData.guardian_name} onChange={handleChange} required />

      <button type="submit">Update Student</button>
    </form>
  );
};

export default EditStudentForm;
