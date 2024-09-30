import React from 'react';

interface RecordFormProps {
  fetchRecords: () => void; // ประกาศประเภทของ fetchRecords
}

const RecordForm: React.FC<RecordFormProps> = ({ fetchRecords }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ทำการส่งข้อมูล
    fetchRecords(); // เรียกใช้ฟังก์ชันเมื่อส่งข้อมูล
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ฟอร์มของคุณที่นี่ */}
      <button type="submit">บันทึก</button>
    </form>
  );
};

export default RecordForm;
