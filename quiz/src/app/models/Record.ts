// src/app/models/Record.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IRecord extends Document {
  title: string;
  description: string;
}

const RecordSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Record = mongoose.model<IRecord>('Record', RecordSchema);
export default Record;
