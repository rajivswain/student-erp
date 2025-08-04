// src/pages/students/AddStudent.jsx
import React, { useState } from 'react';
import { post } from '../../services/api';

function AddStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const newStudent = await post('/students', { name, email });
      setMessage(`Student ${newStudent.name} added!`);
      setName('');
      setEmail('');
    } catch (err) {
      setMessage('Failed to add student.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <button type="submit">Add</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default AddStudent;
