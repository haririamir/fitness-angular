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
router.patch('/plans/:id', updatePlan);
router.delete('/plans/:id', deletePlan);

export default router;
