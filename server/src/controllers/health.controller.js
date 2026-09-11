import mongoose from 'mongoose';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const checkHealth = asyncHandler(async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  const healthData = {
    service: 'BRE_SERVICES API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbStatus,
      readyState: mongoose.connection.readyState,
    },
  };

  return res
    .status(200)
    .json(new ApiResponse(200, healthData, 'System is healthy and running'));
});
