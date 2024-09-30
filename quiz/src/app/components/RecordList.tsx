import React from 'react';
import { Record } from '../types/Record';

interface RecordListProps {
  records: Record[];
}

const RecordList: React.FC<RecordListProps> = ({ records }) => {
  return (
    <ul>
      {records.map((record) => (
        <li key={record._id}>
          {record.date.toString()}: {record.type} - {record.amount} บาท ({record.note})
        </li>
      ))}
    </ul>
  );
};

export default RecordList;
