// src/app/api.ts
import connectDB from './db'; // เชื่อมต่อ MongoDB
import Record from './models/Record'; // นำเข้าโมเดล Record
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(); // เชื่อมต่อกับฐานข้อมูล

  if (req.method === 'POST') {
    try {
      const { title, description } = req.body;

      const newRecord = new Record({ title, description });
      await newRecord.save(); // บันทึกข้อมูลในฐานข้อมูล

      return res.status(201).json(newRecord); // ส่งกลับข้อมูลที่บันทึก
    } catch (error) {
      console.error('Error saving record:', error);
      return res.status(500).json({ message: 'Error saving record' });
    }
  }

  return res.status(405).end(); // วิธีการอื่นๆ ไม่ได้รับอนุญาต
}
