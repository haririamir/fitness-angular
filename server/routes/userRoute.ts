import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../controllers/userController';

const router = Router();

router.get('/users', getUsers);
router.patch('/users/:id', updateUser);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);

export default router;
