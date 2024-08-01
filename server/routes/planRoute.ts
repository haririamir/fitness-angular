import { Router } from 'express';
import { createPlan, getPlans } from '../controllers/planController';

const router = Router();

router.get('/plans', getPlans);
router.post('/plans', createPlan);

export default router;
