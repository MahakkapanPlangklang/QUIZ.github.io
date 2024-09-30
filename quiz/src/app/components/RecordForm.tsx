import React, { useState } from 'react';
import axios from 'axios';

const RecordForm: React.FC<{ fetchRecords: () => void }> = ({ fetchRecords }) => {
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [note, setNote] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = { amount, date, type, note };
    await axios.post('/api/records', newRecord);
    fetchRecords(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลใหม่
    setAmount(0);
    setDate(new Date().toISOString().slice(0, 10));
    setType('income');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
        <option value="income">รายรับ</option>
        <option value="expense">รายจ่าย</option>
      </select>
      <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="หมายเหตุ" />
      <button type="submit">บันทึก</button>
    </form>
  );
};

export default RecordForm;
