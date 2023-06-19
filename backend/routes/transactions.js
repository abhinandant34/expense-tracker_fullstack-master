const { addExpense, getExpense, deleteExpense,getallExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, getallIncomes} = require('../controllers/income');
const {addUser}= require('../controllers/user');
const {authUser,getUser}= require('../controllers/authenticate')

const router = require('express').Router();


router.post('/add-income', addIncome)
    .get('/get-incomes/:title', getIncomes)
    .get('/get-all-incomes', getallIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses/:title', getExpense)
    .get('/get-all-expenses', getallExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/signup-user', addUser)
    .get('/get-user', getUser)
    .post('/auth-user', authUser)

module.exports = router