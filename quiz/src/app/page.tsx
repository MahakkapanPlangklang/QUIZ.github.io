"use client"; // ทำให้แน่ใจว่านี่เป็น Client Component

import { useState, useEffect } from "react";
import Image from "next/image"; // ใช้สำหรับแสดงภาพ
import styles from "./page.module.css";
import Chart from 'chart.js/auto'; // เพิ่มไลบรารีสำหรับกราฟ

interface Record {
    amount: number;
    date: string;
    type: 'income' | 'expense'; // เพิ่มประเภท
    note: string;
}

export default function Home() {
    const [records, setRecords] = useState<Record[]>([]);
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [type, setType] = useState<'income' | 'expense'>('income'); // ประเภทของรายรับ/รายจ่าย
    const [note, setNote] = useState<string>('');

    // ฟังก์ชันสำหรับบันทึกข้อมูล
    const saveRecord = () => {
        if (amount && date && note) {
            const newRecord: Record = { 
                amount: Number(amount), 
                date, 
                type, 
                note 
            };
            setRecords([...records, newRecord]);
            setAmount('');
            setDate('');
            setNote('');
        } else {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        }
    };

    // คำนวณยอดรวมรายรับรายจ่าย
    const getTotalIncome = () => {
        return records
            .filter(record => record.type === 'income')
            .reduce((acc, record) => acc + record.amount, 0);
    };

    const getTotalExpense = () => {
        return records
            .filter(record => record.type === 'expense')
            .reduce((acc, record) => acc + record.amount, 0);
    };

    // สร้างกราฟ
    useEffect(() => {
        const ctx = document.getElementById('myChart') as HTMLCanvasElement;
        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['รายรับ', 'รายจ่าย'],
                    datasets: [{
                        label: 'ยอดรวม',
                        data: [getTotalIncome(), getTotalExpense()],
                        backgroundColor: ['#4CAF50', '#F44336'],
                    }],
                },
                options: {
                    responsive: true,
                },
            });
            return () => chart.destroy(); // ทำความสะอาดกราฟเมื่อคอมโพเนนต์ถูกยกเลิก
        }
    }, [records]); // ทำการอัพเดทกราฟเมื่อมีการบันทึกใหม่

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>บันทึกรายรับรายจ่าย</h1>

                <input
                    type="number"
                    placeholder="จำนวน"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
                    <option value="income">รายรับ</option>
                    <option value="expense">รายจ่าย</option>
                </select>
                <input
                    type="text"
                    placeholder="โน้ต"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <button onClick={saveRecord}>บันทึก</button>

                <h2>รายการบันทึก</h2>
                <ul>
                    {records.map((record, index) => (
                        <li key={index}>{`${record.date}: ${record.type === 'income' ? '+' : '-'}${record.amount} - ${record.note}`}</li>
                    ))}
                </ul>

                <h2>ยอดรวม</h2>
                <p>รายรับ: {getTotalIncome()}</p>
                <p>รายจ่าย: {getTotalExpense()}</p>

                <h2>กราฟรายรับรายจ่าย</h2>
                <canvas id="myChart" width="400" height="200"></canvas>

                <Image
                    className={styles.logo}
                    src="https://nextjs.org/icons/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
            </main>
        </div>
    );
}
