import { Router } from 'express';
import {
  uploadSingle,
  uploadMultiple,
  deleteImage,
} from '../controllers/upload.controller.js';
import {
  uploadSingleImage,
  uploadMultipleImages,
} from '../middlewares/upload.middleware.js';

const router = Router();

// Upload a single image
router.post('/image', uploadSingleImage('image'), uploadSingle);

// Upload multiple images (up to 5)
router.post('/images', uploadMultipleImages('images', 5), uploadMultiple);

// Delete an image
router.delete('/image', deleteImage);

export default router;
