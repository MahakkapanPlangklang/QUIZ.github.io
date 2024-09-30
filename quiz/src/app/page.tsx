"use client"; // ทำเครื่องหมายคอมโพเนนต์นี้เป็น Client Component

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

interface Record {
    amount: number;
    date: string;
    type: 'income' | 'expense';
    note: string;
    id?: number;
}

// เปลี่ยน URL นี้เป็น URL ที่ถูกต้องตามที่คุณใช้งาน
const API_URL = 'https://quiz-flame-one.vercel.app/';

const Page = () => {
    const [records, setRecords] = useState<Record[]>([]);
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [type, setType] = useState<'income' | 'expense'>('income');
    const [note, setNote] = useState<string>('');
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalExpense, setTotalExpense] = useState<number>(0);

    const saveRecord = async () => {
        try {
            const record: Record = { amount: Number(amount), date, type, note };
            await axios.post(API_URL, record);
            fetchRecords();
        } catch (error) {
            console.error("Error saving record:", error);
            alert("ไม่สามารถบันทึกข้อมูลได้");
        }
    };

    const fetchRecords = async () => {
        try {
            const response = await axios.get(API_URL);
            const recordsData: Record[] = response.data;
            setRecords(recordsData);
            calculateTotals(recordsData);
        } catch (error) {
            console.error("Error fetching records:", error);
            alert("ไม่สามารถดึงข้อมูลบันทึกได้");
        }
    };

    const calculateTotals = (data: Record[]) => {
        const income = data.filter(record => record.type === 'income').reduce((sum, record) => sum + record.amount, 0);
        const expense = data.filter(record => record.type === 'expense').reduce((sum, record) => sum + record.amount, 0);
        setTotalIncome(income);
        setTotalExpense(expense);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

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
