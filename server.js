const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const connectionToDB = require('./db/connectionToDB')
const transactionRoutes = require('./routes/transactionRoutes')
const categoryRoutes = require('./routes/categoryRoutes'); // Ensure the path is correct
const app = express();

//middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/api/transactions', transactionRoutes)
app.use('/api/categories', categoryRoutes)

connectionToDB();

app.listen(3000, () => {console.log("server is running at http://localhost:3000")})