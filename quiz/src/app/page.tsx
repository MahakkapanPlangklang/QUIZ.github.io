import { useEffect, useState } from "react";
import RecordForm from "./components/RecordForm";
import RecordList from "./components/RecordList";
import connectDB from "./db";

export default function Home() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    connectDB();
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const response = await fetch('/api/records');
    const data = await response.json();
    setRecords(data);
  };

  return (
    <div>
      <h1>รายรับ-รายจ่าย</h1>
      <RecordForm fetchRecords={fetchRecords} />
      <RecordList records={records} />
    </div>
  );
}
