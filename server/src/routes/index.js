import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import uploadRoutes from './upload.routes.js';
import businessRoutes from './business.routes.js';
import categoryRoutes from './category.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);
router.use('/businesses', businessRoutes);
router.use('/services', businessRoutes); // Alias for service route
router.use('/categories', categoryRoutes);

export default router;


