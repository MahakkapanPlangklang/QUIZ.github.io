import React, { useState } from 'react';
import Auth from './components/Auth';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <div>
      {!token ? (
        <Auth onAuthSuccess={setToken} />
      ) : (
        <>
          <TransactionForm token={token} onAddTransaction={() => {}} />
          <TransactionList token={token} />
          <ExpenseChart token={token} />
        </>
      )}
    </div>
  );
};

export default App;
