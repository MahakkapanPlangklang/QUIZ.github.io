// src/app/components/RecordList.tsx
import React from 'react';
import { Record as RecordType } from '../types/Record';

interface RecordListProps {
  records: RecordType[];
}

const RecordList: React.FC<RecordListProps> = ({ records }) => {
  return (
    <ul>
      {records.map(record => (
        <li key={record._id}>{record.name}</li> // ใช้งาน Record ที่มี _id และ name
      ))}
    </ul>
  );
};

export default RecordList;
