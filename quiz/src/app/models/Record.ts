// src/app/models/Record.ts
import mongoose, { Document, Schema } from 'mongoose';

// ประเภทสำหรับ Record
export interface IRecord extends Document {
  title: string;
  description: string;
}

// สร้าง Schema สำหรับ Record
const RecordSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// สร้างโมเดลจาก Schema
const Record = mongoose.model<IRecord>('Record', RecordSchema);

// ส่งออกโมเดล
export default Record;
