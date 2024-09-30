// src/app/models/Record.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Record extends Document {
  name: string;
  description: string;
}

const recordSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const RecordModel = mongoose.model<Record>('Record', recordSchema);

export default RecordModel;
