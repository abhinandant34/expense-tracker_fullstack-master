import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useGlobalContext} from "../../context/globalContext";
import {InnerLayout} from "../../styles/Layouts";
import IncomeItem from "../IncomeItem/IncomeItem";
import {rupee} from "../../utils/Icons";
import Button from "../Button/Button";

function Download() {
    const [errorDownload, setErrorDownload] = useState("");

    const {
        transactions,
        deleteTransaction,
        totalIncome,
        totalExpenses,
        username,
        downloadTransactions,
        getTransactions,
        defaultFiltersTransactions,
    } = useGlobalContext();

    const [inputState, setInputState] = useState({
        searchFilters: defaultFiltersTransactions,
    });

    const {searchFilters} = inputState;

    const handleInput = (event) => {
        // setInputState({ ...inputState, [name]: e.target.value });

        const {name, value: val} = event.target;
        console.log("name", name, event);
        // if (name === city)
        // const updateName =
        setInputState((prev) => {
            const searchFilters = {
                ...prev.searchFilters,
                [name]: val,
            };

            return {...prev, searchFilters};
        });
    };

    useEffect(() => {
        getTransactions({
            title: username,
            amount: inputState.searchFilters.amount,
            description: inputState.searchFilters.description,
            type: inputState.searchFilters.type,
            date: inputState.searchFilters.date,
        });
    }, [inputState]);

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Manage Transactions</h1>
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

                <div className="search-filters">
                    <div className="col">
                        <input
                            type="text"
                            name="amount"
                            placeholder="Search Amount"
                            value={searchFilters.amount}
                            onChange={(event) => handleInput(event)}
                        ></input>
                    </div>

                    <div className="col">
                        <select name="type" onChange={(event) => handleInput(event)}>
                            <option value="">All Types</option>
                            <option value="Credit">Credit</option>
                            <option value="Debit">Debit</option>
                        </select>
                    </div>

                    <div className="col">
                        <input
                            type="date"
                            name="date"
                            placeholder=""
                            value={searchFilters.date}
                            onChange={(event) => handleInput(event)}
                        ></input>
                    </div>
                </div>

                <div className="income-content">
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
                <div className="download-container">
                  {errorDownload && <p className="error">{errorDownload}</p>}
                  <Button
                      name={"Download"}
                      bPad={".8rem 1.6rem"}
                      bRad={"30px"}
                      bg={"var(--color-accent"}
                      color={"#fff"}
                      onClick={downloadTransactions}
                  />
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

  .search-filters {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh;
    gap: 20vw;

  }
`;

export default Download;
