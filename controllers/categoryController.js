const Category = require('../models/Category');

const createCategory = async (req, res) => {
  const categoryVal = new Category(req.body);
  try {
    await categoryVal.save();
    res.status(201).json(categoryVal);
    console.log("Category creation successful");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createCategory };
