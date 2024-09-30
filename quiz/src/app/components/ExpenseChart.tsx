import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

interface ExpenseChartProps {
  token: string;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ token }) => {
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await axios.get('/transactions/summary', {
          headers: { Authorization: token },
        });

        setChartData({
          labels: ['Month 1', 'Month 2'],
          datasets: [
            {
              label: 'Income',
              data: [data.incomeMonth1, data.incomeMonth2],
              borderColor: 'green',
              fill: false,
            },
            {
              label: 'Expense',
              data: [data.expenseMonth1, data.expenseMonth2],
              borderColor: 'red',
              fill: false,
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchSummary();
  }, [token]);

  return <Line data={chartData} />;
};

export default ExpenseChart;
