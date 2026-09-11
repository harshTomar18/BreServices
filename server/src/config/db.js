import mongoose from 'mongoose';

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bre_services';

  try {
    const connectionInstance = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected successfully! Host: ${connectionInstance.connection.host}`);
    return connectionInstance;
  } catch (error) {
    console.warn(`[MongoDB] Connection warning: Could not connect to ${mongoURI} (${error.message})`);
    console.warn(`[MongoDB] The server will still run. Update MONGODB_URI in server/.env when ready.`);
    return null;
  }
};
