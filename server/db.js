const mongoose = require('mongoose');

async function connectDB(uri) {
    if (!uri) {
        throw new Error('MONGO_URI is not configured');
    }

    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
    });

    console.log('Connected to MongoDB successfully');

    return mongoose.connection;
}

async function disconnectDB() {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    }
}

module.exports = {
    connectDB,
    disconnectDB,
};