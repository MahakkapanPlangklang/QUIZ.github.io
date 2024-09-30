// src/app/components/RecordForm.tsx
import React, { useState } from 'react';

const RecordForm: React.FC<{ fetchRecords: () => void }> = ({ fetchRecords }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      fetchRecords(); // เรียกใช้งานฟังก์ชัน fetchRecords เพื่อรีเฟรชข้อมูล
      setTitle(''); // รีเซ็ตค่า title
      setDescription(''); // รีเซ็ตค่า description
    } else {
      console.error('Error submitting form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Add Record</button>
    </form>
  );
};

export default RecordForm;
