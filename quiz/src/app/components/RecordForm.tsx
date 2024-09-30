import { useState } from "react";

interface RecordFormProps {
  fetchRecords: () => void; // ประกาศประเภทของ fetchRecords
}

const RecordForm: React.FC<RecordFormProps> = ({ fetchRecords }) => {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [type, setType] = useState("income");
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, date, type, note }),
    });
    fetchRecords();
    setAmount(0);
    setDate("");
    setType("income");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="จำนวน" required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">รายรับ</option>
        <option value="expense">รายจ่าย</option>
      </select>
      <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="โน้ต" />
      <button type="submit">บันทึก</button>
    </form>
  );
};

export default RecordForm;
