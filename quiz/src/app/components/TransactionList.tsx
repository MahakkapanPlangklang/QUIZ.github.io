import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Transaction {
  _id: string;
  amount: number;
  type: string;
  note: string;
  date: string;
}

interface TransactionListProps {
  token: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ token }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get('/transactions/list', {
          headers: { Authorization: token },
        });
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactions();
  }, [token]);

  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction._id}>
          {transaction.date}: {transaction.type === 'income' ? '+' : '-'}{transaction.amount} - {transaction.note}
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
