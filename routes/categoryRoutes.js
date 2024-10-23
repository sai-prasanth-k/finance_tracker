const express = require('express');
const { createCategory } = require('../controllers/categoryController'); // Ensure the path is correct

const router = express.Router();

router.post('/', createCategory);

module.exports = router;
