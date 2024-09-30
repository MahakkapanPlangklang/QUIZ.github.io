import React from 'react';
import { Record } from '../types/Record'; // นำเข้าประเภท Record

interface RecordListProps {
  records: Record[]; // ประกาศประเภทของ records
}

const RecordList: React.FC<RecordListProps> = ({ records }) => {
  return (
    <ul>
      {records.map((record) => (
        <li key={record._id}>
          {/* แสดงข้อมูลของแต่ละ record */}
          <span>{record.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default RecordList;
