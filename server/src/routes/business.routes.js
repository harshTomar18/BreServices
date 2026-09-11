import { Router } from 'express';
import {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  seedBusinesses,
} from '../controllers/business.controller.js';

const router = Router();

router.get('/', getAllBusinesses);
router.post('/seed', seedBusinesses);
router.get('/:id', getBusinessById);
router.post('/', createBusiness);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);

export default router;
