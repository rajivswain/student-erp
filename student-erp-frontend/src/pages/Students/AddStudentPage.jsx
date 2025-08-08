// // src/pages/students/AddStudent.jsx
// import React, { useState } from 'react';
// import { createStudent } from '../../services/studentsService';
// import { supabase } from '../../lib/supabaseClient';
// import AddStudentForm from '../../components/Students/AddStudentForm';

// const AddStudent = () => {
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePhotoChange = (e) => {
//     setPhotoFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let photoUrl = '';

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

//     const studentData = {
//       ...formData,
//       photo: photoUrl
//     };

//     try {
//       const result = await createStudent(studentData);
//       console.log('Student created:', result);
//       alert('Student added successfully!');
//       setFormData({
//         name: '',
//         roll_number: '',
//         class: '',
//         section: '',
//         dob: '',
//         email: '',
//         phone: '',
//         address: '',
//         guardian_name: '',
//         photo: ''
//       });
//       setPhotoFile(null);
//     } catch (error) {
//       console.error('Error adding student:', error);
//       alert('Failed to add student.');
//     }
//   };

//   return (
//     <AddStudentForm
//       formData={formData}
//       photoFile={photoFile}
//       handleChange={handleChange}
//       handlePhotoChange={handlePhotoChange}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

// export default AddStudent;





import React, { useState } from 'react';
import { post } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
  const [formData, setFormData] = useState({ name: '', email: '', photo: null });
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate();

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

      await post('/students', payload);
      navigate('/students');
    } catch (err) {
      console.error('Failed to add student', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4">Add Student</h2>

      {photoPreview && (
        <img
          src={photoPreview}
          alt="Preview"
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
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
