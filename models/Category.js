const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid')
const {Schema, model, models} = mongoose

const CategorySchema = new Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
});

const Category = models.Category || model('Category', CategorySchema);

module.exports = Category;
