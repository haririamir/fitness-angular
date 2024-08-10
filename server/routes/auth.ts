import { Router } from 'express';
import { login, regester } from '../controllers/auth';

const router = Router();

router.post('/login', login);
router.post('/regester', regester);

export default router;
