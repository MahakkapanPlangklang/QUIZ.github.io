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

const page = () => {
    const [records, setRecords] = useState<Record[]>([]); 
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('income'); 
    const [note, setNote] = useState('');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    
    const API_URL = 'http://localhost:3000/records'; 

    const saveRecord = async () => {
        const record: Record = { amount: Number(amount), date, type, note }; // ระบุประเภทให้กับ record
        await axios.post(API_URL, record);
        fetchRecords(); // โหลดรายการใหม่หลังบันทึก
    };

    // ฟังก์ชันสำหรับดึงข้อมูลรายการจากฐานข้อมูล
    const fetchRecords = async () => {
        const response = await axios.get(API_URL);
        const recordsData: Record[] = response.data; // ระบุประเภทให้กับ recordsData
        setRecords(recordsData);
        calculateTotals(recordsData);
    };

    // ฟังก์ชันสำหรับคำนวณรวมรายรับและรายจ่าย
    const calculateTotals = (data: Record[]) => { // ระบุประเภทให้กับ data
        const income = data.filter(record => record.type === 'income').reduce((sum, record) => sum + record.amount, 0);
        const expense = data.filter(record => record.type === 'expense').reduce((sum, record) => sum + record.amount, 0);
        setTotalIncome(income);
        setTotalExpense(expense);
    };

    useEffect(() => {
        fetchRecords(); // เรียกฟังก์ชันเมื่อคอมโพเนนต์โหลด
    }, []);

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
                {records.map(record => (
                    <li key={record.id}>{`${record.date} - ${record.type === 'income' ? 'รายรับ' : 'รายจ่าย'}: ${record.amount} (${record.note})`}</li>
                ))}
            </ul>

            <h3>รวมรายรับ: {totalIncome} | รวมรายจ่าย: {totalExpense}</h3>

            <h2>กราฟรายรับรายจ่าย</h2>
            <Line data={chartData} />
        </div>
    );
};

export default page;
