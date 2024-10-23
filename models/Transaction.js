const mongoose = require("mongoose");
const {v4: uuidv4} = require('uuid');
const {Schema, models, model} = mongoose

const TransactionSchema = new Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required!']
        },
        type: {
            type: String,
            enum: ['income', 'expense'],
            required: [true, 'Type is required!']
        },
        category: {
            type: String,
            required: [true, 'Category is required!']
        },
        date: {
            type: Date,
            default: Date.now,
        },
        description: {
            type: String,
            required: [true, 'Description is required!']
        }
    }, 
    {timestamps: true}
);

const TransactionModel = models.TransactionSchema || model("Transaction", TransactionSchema)

module.exports = TransactionModel;