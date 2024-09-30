export interface Record {
    _id: string; // เพิ่ม `_id` ที่นี่
    amount: number;
    date: Date;
    type: 'income' | 'expense';
    note: string;
  }
  