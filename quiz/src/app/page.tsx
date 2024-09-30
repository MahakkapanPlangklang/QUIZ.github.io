// src/app/page.tsx
"use client"; // เพิ่มบรรทัดนี้เพื่อทำให้คอมโพเนนต์เป็น Client Component

import React, { useEffect, useState } from 'react';
import connectDB from './db'; // เชื่อมต่อ MongoDB
import RecordForm from './components/RecordForm'; // นำเข้า RecordForm
import RecordList from './components/RecordList'; // นำเข้า RecordList
import { Record } from './types/Record'; // นำเข้า Type สำหรับ Record

const Page: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    connectDB(); // เชื่อมต่อฐานข้อมูล
    fetchRecords(); // ดึงข้อมูลรายรับรายจ่ายเมื่อ component ถูก mount
  }, []);

  const fetchRecords = async () => {
    // ฟังก์ชันสำหรับดึงข้อมูลจากฐานข้อมูล
    const response = await fetch('/api/records');
    const data = await response.json();
    setRecords(data);
    calculateTotals(data); // คำนวณยอดรวม
  };

  const calculateTotals = (data: Record[]) => {
    const income = data.filter(record => record.type === 'income').reduce((acc, record) => acc + record.amount, 0);
    const expense = data.filter(record => record.type === 'expense').reduce((acc, record) => acc + record.amount, 0);
    setTotalIncome(income);
    setTotalExpense(expense);
  };

  return (
    <div>
      <h1>บันทึกรายรับรายจ่าย</h1>
      <RecordForm fetchRecords={fetchRecords} />
      <h2>ยอดรวมรายรับ: {totalIncome} บาท</h2>
      <h2>ยอดรวมรายจ่าย: {totalExpense} บาท</h2>
      <RecordList records={records} />
    </div>
  );
};

export default Page;
