import React, { useContext, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const BASE_URL = process.env.REACT_APP_BASE_URL;

console.log("Base Here: " + BASE_URL);

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const defaultFiltersTransactions = {
    title: username,
    amount: "",
    type: "",
    description: "",
    date: "",
  };

  //Transactions
  const addTransaction = async (transaction) => {
    const response = await axios
      .post(`${BASE_URL}add-transaction/`, transaction)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getTransactions({ username: username, amount: "" });
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(`${BASE_URL}upload-file/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getTransactions({ username: username, amount: "" });
      console.log("File uploaded successfully");
      // Handle the response or perform any necessary operations
    } catch (error) {
      setError(error.response.data.message);
      // Handle the error or display an error message to the user
    }
  };

  const getTransactions = async (searchParams) => {
    const response = await axios
      .post(`${BASE_URL}get-transactions`, searchParams)
      .then((response) => {
        //console.log(response.data);
        setTransactions(response.data);
      });
  };

  const getallTransactions = async (username) => {
    const response = await axios.get(`${BASE_URL}get-all-transactions/`);
    setTransactions(response.data);
    //console.log(response.data);
  };

  const deleteTransaction = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-transaction/${id}`);
    getTransactions();
  };

  const totalIncome = () => {
    const creditTransactions = transactions.filter(
      (transaction) => transaction.type === "Credit"
    );
    let totalIncome = 0;
    creditTransactions.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //calculate incomes
  const totalExpenses = () => {
    let totalIncome = 0;
    const debitTransactions = transactions.filter(
      (transaction) => transaction.type === "Debit"
    );
    debitTransactions.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...transactions];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 8);
  };

  const downloadTransactions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-all-transactions/`);
      const transactions = response.data;

      // Create a new workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(transactions);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

      // Generate an Excel file buffer
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Create a Blob from the buffer
      const blob = new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a download link and click it programmatically
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "transactions.xlsx";
      link.click();

      console.log("Transactions exported successfully");
    } catch (error) {
      console.error("Error exporting transactions:", error);
    }
  };

  //Users

  const addUser = async (user) => {
    const response = await axios
      .post(`${BASE_URL}signup-user`, user)
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const authUser = async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}auth-user`, user);
      setUsername(response.data.username);
      setIsAuthenticated(true); // Authentication succeeded
      getUser();
    } catch (err) {
      setError(err.response.data.message);
      setIsAuthenticated(false); // Authentication failed
    }
  };

  const getUser = async (username) => {
    const response = await axios.get(`${BASE_URL}get-user`, username);
    setUsers(response.data);
    console.log(response.data);
  };

  return (
    <GlobalContext.Provider
      value={{
        addTransaction,
        getTransactions,
        getallTransactions,
        uploadFile,
        deleteTransaction,
        transactions,
        totalIncome,
        totalExpenses,
        totalBalance,
        transactionHistory,
        downloadTransactions,
        addUser,
        getUser,
        authUser,
        isAuthenticated,
        setIsAuthenticated,
        username,
        users,
        error,
        setError,
        defaultFiltersTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
