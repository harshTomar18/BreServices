import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

// Load environment variables from .env
dotenv.config();

const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
  // Connect to Database
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[Server] Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`[Server] API Health check available at: http://localhost:${PORT}/api/v1/health`);
  });
};

startServer().catch((error) => {
  console.error(`[Server] Fatal startup error:`, error);
  process.exit(1);
});
