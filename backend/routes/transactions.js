const {addTransaction,uploadFile, getTransactions, getallTransactions, deleteTranaction} = require('../controllers/transaction')
const {addUser}= require('../controllers/user');
const {authUser,getUser}= require('../controllers/authenticate')

const router = require('express').Router();

router.post('/add-transaction', addTransaction)
    .post('/upload-file',uploadFile)
    .post('/get-transactions', getTransactions)
    .get('/get-all-transactions',getallTransactions)
    .delete('/delete-transaction/:id', deleteTranaction)
    .post('/signup-user', addUser)
    .get('/get-user', getUser)
    .post('/auth-user', authUser)

module.exports = router