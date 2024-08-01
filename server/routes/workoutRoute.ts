import { Router } from 'express';
import {
  addDeatilWorkout,
  create,
  getAll,
  getDeatilWorkout,
  remove,
  update,
} from '../controllers/workoutController';

const router = Router();

router.get('/workouts', getAll);
router.post('/workouts', create);
router.delete('/workouts/:id', remove);
router.patch('/workouts/:id', update);
router.post('/workouts/details', addDeatilWorkout);
router.get('/workouts/details', getDeatilWorkout);

export default router;
