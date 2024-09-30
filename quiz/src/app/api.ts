import connectDB from './db';
import Record from './models/Record';
import { NextApiRequest, NextApiResponse } from 'next';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, date, type, note, userId } = req.body;

    try {
      const newRecord = new Record({ amount, date, type, note, userId });
      await newRecord.save();
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(500).json({ message: 'Error saving record', error });
    }
  } else if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      const records = await Record.find({ userId });
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching records', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
