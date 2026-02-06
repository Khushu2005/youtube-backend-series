const mongoose = require('mongoose');


async function connectDB() {   
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(' MongoDB Connected successfully');
    }
    catch (error) {
        console.log('MongoDB connection error:', error);
        
    }
}

module.exports = connectDB;