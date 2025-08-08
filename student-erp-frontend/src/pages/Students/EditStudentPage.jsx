// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getStudentById, updateStudent } from '../../services/studentsService';
// import { supabase } from '../../lib/supabaseClient';
// import EditStudentForm from '../../components/Students/EditStudentForm';

// const EditStudent = () => {
//   const { id } = useParams();
//   const [formData, setFormData] = useState({
//     name: '',
//     roll_number: '',
//     class: '',
//     section: '',
//     dob: '',
//     email: '',
//     phone: '',
//     address: '',
//     guardian_name: '',
//     photo: ''
//   });

//   const [photoFile, setPhotoFile] = useState(null);
//   const [existingPhotoUrl, setExistingPhotoUrl] = useState('');

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const student = await getStudentById(id);
//         setFormData(student);
//         setExistingPhotoUrl(student.photo || '');
//       } catch (error) {
//         console.error('Failed to fetch student:', error);
//       }
//     };

//     fetchStudent();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePhotoChange = (e) => {
//     setPhotoFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let photoUrl = existingPhotoUrl;

//     if (photoFile) {
//       const fileName = `${Date.now()}_${photoFile.name}`;
//       const { data, error } = await supabase.storage
//         .from('student-photos')
//         .upload(fileName, photoFile);

//       if (error) {
//         console.error('Photo upload failed:', error);
//         alert('Photo upload failed.');
//         return;
//       }

//       photoUrl = supabase.storage
//         .from('student-photos')
//         .getPublicUrl(fileName).data.publicUrl;
//     }

//     const updatedStudent = {
//       ...formData,
//       photo: photoUrl
//     };

//     try {
//       await updateStudent(id, updatedStudent);
//       alert('Student updated successfully!');
//     } catch (error) {
//       console.error('Error updating student:', error);
//       alert('Failed to update student.');
//     }
//   };

//   return (
//     <EditStudentForm
//       formData={formData}
//       photoFile={photoFile}
//       existingPhotoUrl={existingPhotoUrl}
//       handleChange={handleChange}
//       handlePhotoChange={handlePhotoChange}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

// export default EditStudent;



import React, { useEffect, useState } from 'react';
import { get, put } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function EditStudent() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', email: '', photo: null });
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudent() {
      try {
        const data = await get(`/students/${id}`);
        setFormData({ name: data.name, email: data.email, photo: null });
        if (data.photoUrl) setPhotoPreview(data.photoUrl); // Supabase public URL
      } catch (err) {
        console.error('Failed to load student', err);
      }
    }
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      if (formData.photo) payload.append('photo', formData.photo);

      await put(`/students/${id}`, payload);
      navigate('/students');
    } catch (err) {
      console.error('Failed to update student', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4">Edit Student</h2>

      {photoPreview && (
        <img
          src={photoPreview}
          alt="Student"
          className="w-32 h-32 object-cover rounded mb-4"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Update Student
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
