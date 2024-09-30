// src/app/page.tsx
"use client"; // ทำให้คอมโพเนนต์นี้เป็น Client Component
import { useEffect, useState } from 'react';
import connectDB from './db'; // เชื่อมต่อ MongoDB
import RecordList from './components/RecordList';
import RecordForm from './components/RecordForm';

const Page = () => {
  const [records, setRecords] = useState([]);

  // ใช้ useEffect เพื่อเรียก connectDB และ fetchRecords
  useEffect(() => {
    const initializeDatabase = async () => {
      await connectDB(); // เรียกเชื่อมต่อกับฐานข้อมูล
      await fetchRecords(); // เรียกฟังก์ชัน fetchRecords ที่คุณต้องสร้าง
    };

    initializeDatabase();
  }, []);

  // ฟังก์ชันสำหรับดึงข้อมูลจากฐานข้อมูล
  const fetchRecords = async () => {
    try {
      const response = await fetch('/api'); // เปลี่ยน URL เป็น API ของคุณ
      const data = await response.json();
      setRecords(data); // ตั้งค่ารายการที่ดึงมาจากฐานข้อมูล
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  return (
    <div>
      <h1>Record List</h1>
      <RecordForm fetchRecords={fetchRecords} />
      <RecordList records={records} />
    </div>
  );
};

export default Page;
