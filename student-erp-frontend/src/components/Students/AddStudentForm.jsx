
// // src/components/AddStudentForm.jsx
// import React, { useState } from 'react';
// import { createStudent } from '../services/studentsService';
// import { supabase } from '../lib/supabaseClient'; // 📦 Supabase client for uploading photo

// const AddStudentForm = () => {
//   // 🧠 State to track form fields
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
//     photo: '' // 🖼️ Will hold uploaded photo URL
//   });

//   // 📁 State to track selected file
//   const [photoFile, setPhotoFile] = useState(null);

//   // 📝 Handle text input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // 📸 Handle file input change
//   const handlePhotoChange = (e) => {
//     setPhotoFile(e.target.files[0]);
//   };

//   // 🚀 Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let photoUrl = '';

//     // 📤 Upload photo to Supabase if selected
//     if (photoFile) {
//       const fileName = `${Date.now()}_${photoFile.name}`;
//       const { data, error } = await supabase.storage
//         .from('student-photos') // 🪣 Your Supabase bucket name
//         .upload(fileName, photoFile);

//       if (error) {
//         console.error('Photo upload failed:', error);
//         alert('Photo upload failed.');
//         return;
//       }

//       // 🌐 Get public URL of uploaded photo
//       photoUrl = supabase.storage
//         .from('student-photos')
//         .getPublicUrl(fileName).data.publicUrl;
//     }

//     // 🧾 Combine form data with photo URL
//     const studentData = {
//       ...formData,
//       photo: photoUrl
//     };

//     try {
//       const result = await createStudent(studentData); // 📬 Send to backend
//       console.log('Student created:', result);
//       alert('Student added successfully!');

//       // 🧹 Reset form
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
//     <form onSubmit={handleSubmit}>
//       <h2>Add New Student</h2>

//       {/* 🧾 Text Inputs */}
//       <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//       <input type="text" name="roll_number" placeholder="Roll Number" value={formData.roll_number} onChange={handleChange} required />
//       <input type="text" name="class" placeholder="Class" value={formData.class} onChange={handleChange} required />
//       <input type="text" name="section" placeholder="Section" value={formData.section} onChange={handleChange} required />
//       <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
//       <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//       <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
//       <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
//       <input type="text" name="guardian_name" placeholder="Guardian Name" value={formData.guardian_name} onChange={handleChange} required />

//       {/* 📸 File Input for Photo */}
//       <input type="file" accept="image/*" onChange={handlePhotoChange} />

//       {/* 🖼️ Preview (optional) */}
//       {photoFile && (
//         <div>
//           <p>Preview:</p>
//           <img src={URL.createObjectURL(photoFile)} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
//         </div>
//       )}

//       <button type="submit">Add Student</button>
//     </form>
//   );
// };

// export default AddStudentForm;



// src/components/Students/AddStudentForm.jsx
const AddStudentForm = ({
  formData,
  photoFile,
  handleChange,
  handlePhotoChange,
  handleSubmit
}) => (
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

    <input type="file" accept="image/*" onChange={handlePhotoChange} />

    {photoFile && (
      <div>
        <p>Preview:</p>
        <img src={URL.createObjectURL(photoFile)} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
      </div>
    )}

    <button type="submit">Add Student</button>
  </form>
);

export default AddStudentForm;
