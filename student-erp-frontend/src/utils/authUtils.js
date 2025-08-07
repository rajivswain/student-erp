export const getUserRole = () => {
  return localStorage.getItem('role'); // 'admin', 'teacher', 'student'
};

export const isAdminOrTeacher = () => {
  const role = getUserRole();
  return role === 'admin' || role === 'teacher';
};
