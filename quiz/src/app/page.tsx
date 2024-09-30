"use client"; // ทำเครื่องหมายคอมโพเนนต์นี้เป็น Client Component

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

// ประเภทข้อมูลสำหรับบันทึกรายรับรายจ่าย
interface Record {
    amount: number;
    date: string;
    type: 'income' | 'expense';
    note: string;
    id?: number;
}

const Page = () => {
    const [records, setRecords] = useState<Record[]>([]); // รายการบันทึก
    const [amount, setAmount] = useState<string>(''); // จำนวน
    const [date, setDate] = useState<string>(''); // วันที่
    const [type, setType] = useState<'income' | 'expense'>('income'); // ประเภท
    const [note, setNote] = useState<string>(''); // โน้ต
    const [totalIncome, setTotalIncome] = useState<number>(0); // รวมรายรับ
    const [totalExpense, setTotalExpense] = useState<number>(0); // รวมรายจ่าย

    // ฟังก์ชันบันทึกข้อมูลลงในสถานะ
    const saveRecord = () => {
        const newRecord: Record = { amount: Number(amount), date, type, note, id: records.length + 1 };
        setRecords([...records, newRecord]); // อัปเดตรายการบันทึก
        calculateTotals([...records, newRecord]); // คำนวณยอดรวมใหม่
        resetForm(); // รีเซ็ตฟอร์มหลังบันทึก
    };

    // ฟังก์ชันคำนวณยอดรวมรายรับและรายจ่าย
    const calculateTotals = (data: Record[]) => {
        const income = data.filter(record => record.type === 'income').reduce((sum, record) => sum + record.amount, 0);
        const expense = data.filter(record => record.type === 'expense').reduce((sum, record) => sum + record.amount, 0);
        setTotalIncome(income);
        setTotalExpense(expense);
    };

    // ฟังก์ชันรีเซ็ตฟอร์ม
    const resetForm = () => {
        setAmount('');
        setDate('');
        setType('income');
        setNote('');
    };

    // ข้อมูลสำหรับกราฟ
    const chartData = {
        labels: records.map(record => record.date),
        datasets: [
            {
                label: 'รายรับ',
                data: records.filter(record => record.type === 'income').map(record => record.amount),
                borderColor: 'green',
                fill: false,
            },
            {
                label: 'รายจ่าย',
                data: records.filter(record => record.type === 'expense').map(record => record.amount),
                borderColor: 'red',
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h1>บันทึกรายรับรายจ่าย</h1>
            <input type="number" placeholder="จำนวน" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
                <option value="income">รายรับ</option>
                <option value="expense">รายจ่าย</option>
            </select>
            <input type="text" placeholder="โน้ต" value={note} onChange={(e) => setNote(e.target.value)} />
            <button onClick={saveRecord}>บันทึก</button>

            <h2>รายการบันทึก</h2>
            <ul>
                {records.length > 0 ? (
                    records.map(record => (
                        <li key={record.id}>{`${record.date} - ${record.type === 'income' ? 'รายรับ' : 'รายจ่าย'}: ${record.amount} (${record.note})`}</li>
                    ))
                ) : (
                    <li>ยังไม่มีรายการบันทึก</li>
                )}
            </ul>

            <h3>รวมรายรับ: {totalIncome} | รวมรายจ่าย: {totalExpense}</h3>

            <h2>กราฟรายรับรายจ่าย</h2>
            <Line data={chartData} />
        </div>
    );
};

export default Page;
