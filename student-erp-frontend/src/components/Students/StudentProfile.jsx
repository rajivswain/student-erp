// import React from 'react';

// const StudentProfile = ({ student }) => {
//   if (!student) return null;

//   return (
//     <div className="student-profile">
//       <img src={student.photoUrl} alt={`${student.name}'s photo`} />
//       <h2>{student.name}</h2>
//       <p><strong>Email:</strong> {student.email}</p>
//       <p><strong>Phone:</strong> {student.phone}</p>
//       <p><strong>Department:</strong> {student.department}</p>
//       <p><strong>Enrollment No:</strong> {student.enrollmentNo}</p>
//       {/* Add more fields as needed */}
//     </div>
//   );
// };

// export default StudentProfile;


import React from 'react';

const StudentProfile = ({ student }) => {
  if (!student) return null;

  return (
    <div className="student-profile">
      <img
        src={student.photoUrl || '/default-avatar.png'}
        alt={`${student.name}'s photo`}
        className="student-photo w-32 h-32 object-cover rounded-full mb-4"
      />
      <h2 className="text-xl font-semibold">{student.name}</h2>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      <p><strong>Department:</strong> {student.department}</p>
      <p><strong>Enrollment No:</strong> {student.enrollmentNo}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default StudentProfile;
