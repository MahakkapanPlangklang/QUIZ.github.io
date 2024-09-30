// src/app/components/RecordList.tsx

import React from 'react';
import { Record } from '../types/Record'; // นำเข้า Record

interface RecordListProps {
  records: Record[]; // ใช้ Record ที่นี่
}

const RecordList: React.FC<RecordListProps> = ({ records }) => {
  return (
    <ul>
      {records.map(record => (
        <li key={record._id}>
          {record.date} - {record.type} - {record.amount} - {record.note}
        </li>
      ))}
    </ul>
  );
};

export default RecordList;
