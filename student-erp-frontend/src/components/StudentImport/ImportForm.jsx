// src/components/StudentImport/ImportForm.jsx
import React, { useState } from 'react';
import Papa from 'papaparse';
import { bulkInsertStudents } from '../../services/studentService';
import { validateStudentRow } from '../../utils/validateStudentRow';

// For Excel 
import * as XLSX from 'xlsx';

const handleUpload = () => {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    const validRows = json.filter(validateStudentRow);
    const response = await bulkInsertStudents(validRows);
    setStatus(response.success ? 'Upload successful!' : 'Upload failed.');
  };
  reader.readAsArrayBuffer(file);
};

// For CSV
const ImportForm = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const validRows = results.data.filter(validateStudentRow);
        const response = await bulkInsertStudents(validRows);
        setStatus(response.success ? 'Upload successful!' : 'Upload failed.');
      },
    });
  };

  return (
    <div>
      <h2>Bulk Import Students</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
    </div>
  );
};

export default ImportForm;
