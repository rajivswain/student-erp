// services/storageService.js

import supabase from '../config/supabaseClient.js';
import { v4 as uuidv4 } from 'uuid'; // 🆕 For unique filenames

export async function uploadStudentPhoto(file) {
  const fileExt = file.originalname.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `students/${fileName}`;

  const { error } = await supabase.storage
    .from('student-photos')
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: true
    });

  if (error) {
    throw new Error('Photo upload failed');
  }

  const { data } = supabase.storage
    .from('student-photos')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
