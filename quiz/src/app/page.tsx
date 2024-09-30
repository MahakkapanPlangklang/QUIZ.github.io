import React, { useEffect, useState } from 'react';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import { Record } from './types/Record';

const Page: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);

  // ฟังก์ชันเพื่อดึงข้อมูลบันทึก
  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/records');
      const data: Record[] = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecords(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลเมื่อโหลดคอมโพเนนต์
  }, []);

  return (
    <div>
      <h1>บันทึกรายรับรายจ่าย</h1>
      <RecordForm fetchRecords={fetchRecords} /> {/* ส่งฟังก์ชันไปยัง RecordForm */}
      <RecordList records={records} />
    </div>
  );
};

export default Page;
