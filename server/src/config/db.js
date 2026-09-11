import mongoose from 'mongoose';

let cachedPromise = null;

export const connectDB = async () => {
  // If already connected, reuse existing connection
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bre_services';

  // Cache connection promise for serverless functions (prevents multiple connects per request)
  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(mongoURI, {
        serverSelectionTimeoutMS: 7000,
        connectTimeoutMS: 10000,
      })
      .then((conn) => {
        console.log(`[MongoDB] Connected successfully! Host: ${conn.connection.host}`);
        return conn;
      })
      .catch((err) => {
        cachedPromise = null;
        console.error(`[MongoDB] Connection error: ${err.message}`);
        throw err;
      });
  }

  return cachedPromise;
};
