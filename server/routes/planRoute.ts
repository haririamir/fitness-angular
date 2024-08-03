import { Router } from 'express';
import {
  createPlan,
  deletePlan,
  getPlans,
  updatePlan,
} from '../controllers/planController';

const router = Router();

router.get('/plans', getPlans);
router.post('/plans', createPlan);
router.patch('/plans', updatePlan);
router.delete('/plans', deletePlan);

export default router;
