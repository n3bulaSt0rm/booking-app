const mongoose = require('mongoose');
const { join } = require("node:path");
require('dotenv').config({ path: join(__dirname, '../../../.env') });

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch(error => {
            console.error('MongoDB connection error:', error);
            process.exit(1);
        });
};

module.exports = connectDB;