import { Router } from 'express';
import {
  addDeatilWorkout,
  create,
  getAll,
  remove,
  update,
} from '../controllers/workoutController';

const router = Router();

router.get('/workouts', getAll);
router.post('/workouts', create);
router.delete('/workouts/:id', remove);
router.patch('/workouts/:id', update);
router.patch('/workouts/details', addDeatilWorkout);

export default router;
