import React, { useState } from 'react';
import axios from 'axios';

interface TransactionFormProps {
  token: string;
  onAddTransaction: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ token, onAddTransaction }) => {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<string>('income');
  const [note, setNote] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        '/transactions/add',
        { amount, type, note },
        { headers: { Authorization: token } }
      );
      onAddTransaction();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
