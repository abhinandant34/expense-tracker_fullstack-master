import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "./Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import { rupee } from "../../utils/Icons";

function Income() {
  const {
    transactions,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    username,
    addTransactions,
    getTransactions,
  } = useGlobalContext();

  console.log("Transactions Here: ")
  console.log(transactions);

//   useEffect(() => {
//     //getTransactions(username)
//   }, [addTransactions]);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Transactions</h1>
        <h2 className="total-income">
          <div>
            Total Credit:{" "}
            <span>
              {rupee}
              {totalIncome()}
            </span>
          </div>
          <div>
            Total Debit:{" "}
            <span>
              {rupee}
              {totalExpenses()}
            </span>
          </div>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {transactions.map((transaction) => {
              const {
                _id,
                title,
                amount,
                date,
                category,
                description,
                type,
              } = transaction;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteTransaction}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Income;
