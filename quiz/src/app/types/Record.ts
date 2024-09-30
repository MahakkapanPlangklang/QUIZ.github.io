export interface Record {
    _id?: string;
    name: string;
    amount: number;
    date: Date;
    type: 'income' | 'expense';
    note?: string;
    userId: string;
  }
  