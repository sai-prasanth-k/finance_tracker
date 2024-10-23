const express = require('express')
const { getTransactions, getTransactionById, getTransactionByType, createTransaction, updateTransaction, deleteTransaction, deleteAllTransactions, getSummary } = require('../controllers/transactionController');

const router = express.Router();

router.get('/', getTransactions);
router.get('/summary', getSummary);
router.get('/:id', getTransactionById);
router.get('/:type', getTransactionByType);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/', deleteAllTransactions);
router.delete('/:id', deleteTransaction);

module.exports = router;
