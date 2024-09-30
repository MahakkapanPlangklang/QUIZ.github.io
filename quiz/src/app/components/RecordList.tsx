import React from 'react';

interface Record {
  _id: string; // หรือใช้ประเภทที่คุณกำหนดไว้ในฐานข้อมูล
  amount: number;
  date: string;
  type: 'income' | 'expense'; // ประเภทที่กำหนดให้มีแค่สองค่า
  note: string;
}

interface RecordListProps {
  records: Record[]; // ประกาศประเภทของ records
}

const RecordList: React.FC<RecordListProps> = ({ records }) => {
  return (
    <div>
      <h2>รายการบันทึก</h2>
      <ul>
        {records.map((record) => (
          <li key={record._id}>
            <p>จำนวน: {record.amount}</p>
            <p>วันที่: {record.date}</p>
            <p>ประเภท: {record.type}</p>
            <p>โน้ต: {record.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordList;
