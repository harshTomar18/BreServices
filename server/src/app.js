import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRoutes from './routes/index.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// API Routes
app.use('/api/v1', apiRoutes);

// Fallback for root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to BRE_SERVICES API',
    version: '1.0.0',
    docs: '/api/v1/health',
  });
});

// 404 and Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
