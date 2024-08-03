import { Router } from 'express';
import {
  addDeatilWorkout,
  createWorkout,
  getAllWorkout,
  getDeatilWorkout,
  removeWorkout,
  updateWorkout,
} from '../controllers/workoutController';

const router = Router();

router.get('/workouts', getAllWorkout);
router.post('/workouts', createWorkout);
router.delete('/workouts/:id', removeWorkout);
router.patch('/workouts/:id', updateWorkout);
router.post('/workouts/details', addDeatilWorkout);
router.get('/workouts/details', getDeatilWorkout);

export default router;
