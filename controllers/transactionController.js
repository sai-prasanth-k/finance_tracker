const Transaction = require('../models/Transaction');
const Category = require('../models/Category');

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.find();
    res.status(200).json(transaction);
    console.log(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`fetching transaction id: ${id}`)
    const transaction = await Transaction.findById(id);
    console.log(transaction)
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(transaction);
    console.log(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create a new transaction
const createTransaction = async (req, res) => {
  const { type, category, amount, date, description } = req.body;

  // Validate if the category name exists
  const categoryExists = await Category.findOne({ name: category });
  if (!categoryExists) {
    return res.status(400).json({ message: "Invalid category" });
  }

  const transaction = new Transaction({
    type,
    category,
    amount,
    date,
    description,
  });

  try {
    await transaction.save();
    res.status(201).json(transaction);
    console.log("Successful");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTransaction) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(updatedTransaction);
    console.log("updated Successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTransaction = await Transaction.findByIdAndDelete(id);
    if (!deleteTransaction) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all transactions
const deleteAllTransactions = async (req, res) => {
  try {
    await Transaction.deleteMany({});
    res.status(200).json({ message: 'All transactions deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get summary of transactions
const getSummary = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    const filter = {};

    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (category) {
      filter.category = category;
    }

    const transactions = await Transaction.find(filter);

    const summary = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.type]) {
        acc[transaction.type] = {
          total: 0,
          details: []
        };
      }
      acc[transaction.type].total += transaction.amount;
      acc[transaction.type].details.push(transaction);
      return acc;
    }, {});

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  deleteAllTransactions,
  getSummary,
};
