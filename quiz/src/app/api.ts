// src/app/api.ts
import connectDB from './db'; // เชื่อมต่อ MongoDB
import Record from './models/Record'; // นำเข้าโมเดล Record
import { NextApiRequest, NextApiResponse } from 'next';

// ฟังก์ชันสำหรับจัดการ API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(); // เชื่อมต่อกับฐานข้อมูล

  if (req.method === 'POST') {
    const newRecord = new Record(req.body);
    await newRecord.save();
    return res.status(201).json(newRecord);
  }

  // การตอบสนองสำหรับวิธีการอื่นๆ
  return res.status(405).end();
}
