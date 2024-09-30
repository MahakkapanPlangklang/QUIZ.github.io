// src/app/page.tsx
'use client'; // ทำให้ไฟล์นี้เป็น Client Component
import { useEffect, useState } from 'react';
import connectDB from './db'; // เชื่อมต่อกับฐานข้อมูล
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import { Record as RecordType } from './types/Record'; // นำเข้า Record interface

export default function Page() {
  const [records, setRecords] = useState<RecordType[]>([]); // ใช้ RecordType ในการประกาศ state

  useEffect(() => {
    const initializeDB = async () => {
      await connectDB(); // เชื่อมต่อกับฐานข้อมูล
      fetchRecords(); // ดึงข้อมูลหลังจากเชื่อมต่อฐานข้อมูล
    };

    initializeDB();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/records'); // ใช้ API เพื่อดึงข้อมูล
      const data: RecordType[] = await response.json(); // ใช้ RecordType ในการกำหนดประเภทข้อมูล
      setRecords(data); // อัปเดต state
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  return (
    <div>
      <h1>Quiz Records</h1>
      <RecordForm fetchRecords={fetchRecords} />
      <RecordList records={records} />
    </div>
  );
}
