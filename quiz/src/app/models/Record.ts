import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  note: { type: String },
  userId: { type: String, required: true },
});

const Record = mongoose.model('Record', RecordSchema);
export default Record;
