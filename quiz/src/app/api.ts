// src/app/api.ts
import connectDB from './db';
import RecordModel, { Record } from './models/Record';
import { NextApiRequest, NextApiResponse } from 'next';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, description }: Record = req.body;

    try {
      const newRecord = new RecordModel({ name, description });
      await newRecord.save();
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(500).json({ message: 'Error creating record', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
