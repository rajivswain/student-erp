// src/components/AddStudentForm.jsx
import React, { useState } from 'react';
import { createStudent } from '../services/studentsService';

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    roll_number: '',
    class: '',
    section: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    guardian_name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createStudent(formData);
      console.log('Student created:', result);
      alert('Student added successfully!');
      setFormData({
        name: '',
        roll_number: '',
        class: '',
        section: '',
        dob: '',
        email: '',
        phone: '',
        address: '',
        guardian_name: ''
      });
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Student</h2>

      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="roll_number" placeholder="Roll Number" value={formData.roll_number} onChange={handleChange} required />
      <input type="text" name="class" placeholder="Class" value={formData.class} onChange={handleChange} required />
      <input type="text" name="section" placeholder="Section" value={formData.section} onChange={handleChange} required />
      <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
      <input type="text" name="guardian_name" placeholder="Guardian Name" value={formData.guardian_name} onChange={handleChange} required />

      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
