const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config()

let isConnected = false

const connectionToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('Database is already connected.');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "finace_tracker",
        });

        isConnected = true;
        console.log('Connected to MongoDB');
    } catch(error) {
        console.log("Database connection error:", error)
        process.exit(1);
    }
}

module.exports = connectionToDB