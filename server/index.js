require('dotenv').config();

const app = require('./app');
const { connectDB, disconnectDB } = require('./db');

const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI;

let server;

async function startServer() {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not configured');
    }

    await connectDB(MONGO_URI);

    server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Wavelist server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start Wavelist server:', error.message);
    process.exit(1);
  }
}

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      try {
        await disconnectDB();
        process.exit(0);
      } catch (error) {
        console.error('Error during shutdown:', error.message);
        process.exit(1);
      }
    });
  } else {
    try {
      await disconnectDB();
    } finally {
      process.exit(0);
    }
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

startServer();