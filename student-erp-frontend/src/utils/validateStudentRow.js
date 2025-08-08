// src/utils/validateStudentRow.js
export const validateStudentRow = (row) => {
  return row.name && row.email && row.roll_number;
};
