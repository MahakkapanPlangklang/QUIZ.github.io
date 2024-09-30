"use client"; // ทำเครื่องหมายคอมโพเนนต์นี้เป็น Client Component

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { Line } from "react-chartjs-2";

// ประเภทข้อมูลสำหรับบันทึกรายรับรายจ่าย
interface Record {
    amount: number;
    date: string;
    type: 'income' | 'expense';
    note: string;
    id?: number;
}

export default function Home() {
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
        const updatedRecords = [...records, newRecord];
        setRecords(updatedRecords); // อัปเดตรายการบันทึก
        calculateTotals(updatedRecords); // คำนวณยอดรวมใหม่
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
        <div className={styles.page}>
            <main className={styles.main}>
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
                
                <Image
                    className={styles.logo}
                    src="https://nextjs.org/icons/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <ol>
                    <li>
                        Get started by editing <code>src/app/page.tsx</code>.
                    </li>
                    <li>Save and see your changes instantly.</li>
                </ol>

                <div className={styles.ctas}>
                    <a
                        className={styles.primary}
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className={styles.logo}
                            src="https://nextjs.org/icons/vercel.svg"
                            alt="Vercel logomark"
                            width={20}
                            height={20}
                        />
                        Deploy now
                    </a>
                    <a
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondary}
                    >
                        Read our docs
                    </a>
                </div>
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
