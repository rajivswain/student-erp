// import { utils, writeFile } from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// /**
//  * 📦 Export students to CSV
//  * @param {Array} students - Array of student objects
//  */
// export const exportToCSV = (students) => {
//   const headers = Object.keys(students[0]);
//   const rows = students.map(student => headers.map(h => student[h]));

//   const csvContent = [
//     headers.join(','),
//     ...rows.map(row => row.join(','))
//   ].join('\n');

//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const url = URL.createObjectURL(blob);

//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'students.csv';
//   link.click();
// };

// /**
//  * 📊 Export students to Excel
//  * @param {Array} students - Array of student objects
//  */
// export const exportToExcel = (students) => {
//   const worksheet = utils.json_to_sheet(students);
//   const workbook = utils.book_new();
//   utils.book_append_sheet(workbook, worksheet, 'Students');
//   writeFile(workbook, 'students.xlsx');
// };

// /**
//  * 🧾 Export students to JSON
//  * @param {Array} students - Array of student objects
//  */
// export const exportToJSON = (students) => {
//   const blob = new Blob([JSON.stringify(students, null, 2)], {
//     type: 'application/json',
//   });
//   const url = URL.createObjectURL(blob);

//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'students.json';
//   link.click();
// };

// /**
//  * 📄 Export students to PDF
//  * @param {Array} students - Array of student objects
//  */
// export const exportToPDF = (students) => {
//   const doc = new jsPDF();
//   const headers = Object.keys(students[0]);
//   const rows = students.map(student => headers.map(h => student[h]));

//   doc.text('Student List', 14, 16);
//   doc.autoTable({
//     head: [headers],
//     body: rows,
//     startY: 20,
//   });

//   doc.save('students.pdf');
// };



import { utils, writeFile } from 'xlsx';       // 📊 Excel export
import jsPDF from 'jspdf';                     // 📄 PDF generation
import 'jspdf-autotable';                      // 📄 PDF table support

/**
 * 🔧 Helper: Escape CSV values (handles commas and quotes)
 */
const escapeCSV = (value) =>
  `"${String(value).replace(/"/g, '""')}"`;

/**
 * 📤 Export students to CSV file
 * @param {Array} students - Array of student objects
 */
export const exportToCSV = (students) => {
  if (!students.length) return alert('No student data to export.');

  const headers = Object.keys(students[0]);
  const rows = students.map(student =>
    headers.map(h => escapeCSV(student[h]))
  );

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'students.csv';
  link.click();
};

/**
 * 📊 Export students to Excel (.xlsx)
 * @param {Array} students - Array of student objects
 */
export const exportToExcel = (students) => {
  if (!students.length) return alert('No student data to export.');

  const headers = Object.keys(students[0]);

  // Ensure consistent column order
  const data = students.map(student =>
    headers.reduce((acc, key) => {
      acc[key] = student[key];
      return acc;
    }, {})
  );

  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Students');
  writeFile(workbook, 'students.xlsx');
};

/**
 * 🧾 Export students to JSON (.json)
 * @param {Array} students - Array of student objects
 */
export const exportToJSON = (students) => {
  if (!students.length) return alert('No student data to export.');

  const blob = new Blob([JSON.stringify(students, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'students.json';
  link.click();
};

/**
 * 📄 Export students to PDF (.pdf)
 * @param {Array} students - Array of student objects
 */
export const exportToPDF = (students) => {
  const doc = new jsPDF();

  if (!students.length) {
    doc.text('No student data available.', 14, 16);
    doc.save('students.pdf');
    return;
  }

  const headers = Object.keys(students[0]);
  const rows = students.map(student =>
    headers.map(h => student[h])
  );

  doc.text('Student List', 14, 16);
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('students.pdf');
};
