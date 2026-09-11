import app from '../server/src/app.js';
import { connectDB } from '../server/src/config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error('[Vercel Serverless] DB connection error:', error.message);
    return res.status(500).json({
      success: false,
      message: `Database connection failed. Please ensure 0.0.0.0/0 is added to MongoDB Atlas Network Access. Error: ${error.message}`,
    });
  }
  return app(req, res);
}
