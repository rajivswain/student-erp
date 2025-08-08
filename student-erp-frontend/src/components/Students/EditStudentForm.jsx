// // src/components/Students/EditStudentForm.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchStudentById, updateStudent } from '../../services/studentsService';
// import { supabase } from '../../lib/supabaseClient'; // 📦 Supabase client for photo upload

// const EditStudentForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // 🧠 State to hold student data
//   const [formData, setFormData] = useState(null);

//   // 📁 State to hold new photo file
//   const [photoFile, setPhotoFile] = useState(null);

//   // 📦 Load student data on mount
//   useEffect(() => {
//     const loadStudent = async () => {
//       const student = await fetchStudentById(id);
//       setFormData(student);
//     };
//     loadStudent();
//   }, [id]);

//   // 📝 Handle text input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // 📸 Handle photo file selection
//   const handlePhotoChange = (e) => {
//     setPhotoFile(e.target.files[0]);
//   };

//   // 🚀 Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let photoUrl = formData.photo || '';

//     // 📤 Upload new photo if selected
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

//     // 🧾 Combine updated data
//     const updatedData = {
//       ...formData,
//       photo: photoUrl
//     };

//     try {
//       await updateStudent(id, updatedData); // 📬 Send to backend
//       alert('Student updated successfully!');
//       navigate('/students');
//     } catch (error) {
//       console.error('Update failed:', error);
//       alert('Failed to update student.');
//     }
//   };

//   if (!formData) return <p>Loading...</p>;

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Edit Student</h2>

//       {/* 🧾 Text Inputs */}
//       <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//       <input type="text" name="roll_number" value={formData.roll_number} onChange={handleChange} required />
//       <input type="text" name="class" value={formData.class} onChange={handleChange} required />
//       <input type="text" name="section" value={formData.section} onChange={handleChange} required />
//       <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
//       <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//       <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//       <input type="text" name="address" value={formData.address} onChange={handleChange} required />
//       <input type="text" name="guardian_name" value={formData.guardian_name} onChange={handleChange} required />

//       {/* 📸 File Input for New Photo */}
//       <input type="file" accept="image/*" onChange={handlePhotoChange} />

//       {/* 🖼️ Show existing photo if available */}
//       {formData.photo && (
//         <div>
//           <p>Current Photo:</p>
//           <img src={formData.photo} alt="Student" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
//         </div>
//       )}

//       {/* 🖼️ Preview new photo if selected */}
//       {photoFile && (
//         <div>
//           <p>New Photo Preview:</p>
//           <img src={URL.createObjectURL(photoFile)} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
//         </div>
//       )}

//       <button type="submit">Update Student</button>
//     </form>
//   );
// };

// export default EditStudentForm;



// src/components/Students/EditStudentForm.jsx
const EditStudentForm = ({
  formData,
  photoFile,
  existingPhotoUrl,
  handleChange,
  handlePhotoChange,
  handleSubmit
}) => (
  <form onSubmit={handleSubmit}>
    <h2>Edit Student</h2>

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

    {/* 🖼️ Preview logic */}
    <div>
      {photoFile ? (
        <>
          <p>New Photo Preview:</p>
          <img src={URL.createObjectURL(photoFile)} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
        </>
      ) : existingPhotoUrl ? (
        <>
          <p>Current Photo:</p>
          <img src={existingPhotoUrl} alt="Current" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
        </>
      ) : null}
    </div>

    <button type="submit">Update Student</button>
  </form>
);

export default EditStudentForm;
