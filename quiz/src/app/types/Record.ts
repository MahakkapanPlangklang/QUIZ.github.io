// src/app/types/Record.ts

export interface Record {
    _id: string; // ประกาศให้ _id เป็น string
    amount: number; // จำนวนเงิน
    date: string; // วันที่
    type: 'income' | 'expense'; // ประเภท (รายรับหรือรายจ่าย)
    note: string; // โน้ต
  }
  