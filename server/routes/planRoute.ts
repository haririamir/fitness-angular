import { Router } from 'express';
import { getPlans } from '../controllers/planController';

const router = Router();

router.get('/plans', getPlans);


export default router;
