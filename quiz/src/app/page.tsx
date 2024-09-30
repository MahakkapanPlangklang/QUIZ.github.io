'use client';

import { useEffect, useState } from 'react';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import connectDB from './db';

const Page = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    connectDB(); // เรียกใช้ฟังก์ชัน connectDB
    fetchRecords(); // ถ้าคุณมีฟังก์ชันนี้อยู่
  }, []);

  const fetchRecords = async () => {
    const response = await fetch('/api', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    setRecords(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <RecordForm fetchRecords={fetchRecords} />
      <RecordList records={records} />
    </div>
  );
};

export default Page;
