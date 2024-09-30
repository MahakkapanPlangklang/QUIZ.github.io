import connectDB from './db'; // เชื่อมต่อ MongoDB
import Record from './Record'; // Model สำหรับ Record
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  if (req.method === 'GET') {
    const records = await Record.find({});
    res.status(200).json(records);
  } else if (req.method === 'POST') {
    const { amount, date, type, note, userId } = req.body;
    const newRecord = new Record({ amount, date, type, note, userId });
    await newRecord.save();
    res.status(201).json(newRecord);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
