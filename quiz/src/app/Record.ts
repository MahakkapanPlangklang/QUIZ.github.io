import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  note: { type: String, required: false },
  userId: { type: String, required: true }, // แยกรายการตามผู้ใช้
});

const Record = mongoose.model('Record', recordSchema);
export default Record;
