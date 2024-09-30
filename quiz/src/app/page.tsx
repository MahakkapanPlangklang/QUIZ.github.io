// src/app/page.tsx

"use client"; // เพิ่มบรรทัดนี้สำหรับ Client Component

import React, { useEffect, useState } from 'react';
import connectDB from './db';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import { Record } from './types/Record'; // นำเข้า Record

const Page = () => {
  const [records, setRecords] = useState<Record[]>([]); // ใช้ Record ที่นี่

  const fetchRecords = async () => {
    const response = await fetch('/api/records'); // เปลี่ยนตาม API ของคุณ
    const data = await response.json();
    setRecords(data);
  };

  useEffect(() => {
    const initializeDatabase = async () => {
      await connectDB();
      await fetchRecords();
    };

    initializeDatabase();
  }, []);

  return (
    <div>
      <h1>บันทึกรายรับรายจ่าย</h1>
      <RecordForm fetchRecords={fetchRecords} /> {/* ส่งฟังก์ชัน fetchRecords ผ่าน props */}
      <RecordList records={records} /> {/* ส่ง records ผ่าน props */}
    </div>
  );
};

export default Page;
