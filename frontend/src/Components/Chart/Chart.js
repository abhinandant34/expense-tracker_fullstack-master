import React from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { transactions } = useGlobalContext();

  // Separate credit and debit transactions
  const creditTransactions = transactions.filter(transaction => transaction.type === 'Credit');
  const debitTransactions = transactions.filter(transaction => transaction.type === 'Debit');

  const data = {
    labels: transactions.map(inc => dateFormat(inc.date)),
    datasets: [
      {
        label: 'Credit',
        data: creditTransactions.map(credit => credit.amount),
        backgroundColor: 'green',
        tension: 0.2
      },
      {
        label: 'Debit',
        data: debitTransactions.map(debit => debit.amount),
        backgroundColor: 'red',
        tension: 0.2
      }
    ]
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;