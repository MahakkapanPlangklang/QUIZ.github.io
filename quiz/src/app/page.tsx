"use client"; // ทำให้แน่ใจว่านี่เป็น Client Component

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [records, setRecords] = useState<{ amount: number; date: string }[]>([]);

    const saveRecord = () => {
        if (amount && date) {
            const newRecord = { amount: Number(amount), date };
            setRecords([...records, newRecord]);
            setAmount('');
            setDate('');
        } else {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        }
    };

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
                <button onClick={saveRecord}>บันทึก</button>

                <h2>รายการบันทึก</h2>
                <ul>
                    {records.map((record, index) => (
                        <li key={index}>{`${record.date}: ${record.amount}`}</li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
