import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5000/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [users, setUsers]= useState([])
    const [username, setUsername]= useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async (username) => {
        const response = await axios.get(`${BASE_URL}get-incomes/${username}`)     
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async (username) => {
        const response = await axios.get(`${BASE_URL}get-expenses/${username}`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    //Users

    const addUser = async (user) => {
        const response = await axios.post(`${BASE_URL}signup-user`, user)
            .catch((err) =>{
                setError(err.response.data.message)
            })
    }   

    const authUser = async (user) => {
        const response = await axios.post(`${BASE_URL}auth-user`, user)  
        .catch((err) =>{
            setError(err.response.data.message)
        })
        setUsername(response.data.username)
        // if (response.data.redirectTo === '/dashboard') {
        //     history.push('/dashboard');
        //   }
      }
      
    // const getUser = async (username) => {
    //     console.log(username)
    //     const response = await axios.get(`${BASE_URL}get-user/${username}`)
    //     setUsers(response.data)
    //     console.log(response.data)
    // }
      
    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            addUser,
            // getUser,
            authUser,
            username,
            users,
            error,
            setError,
            
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}