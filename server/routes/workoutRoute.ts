import { Router } from 'express';
import {
  addDeatilWorkout,
  createWorkout,
  getAllWorkout,
  getDeatilWorkout,
  removeWorkout,
  removeWorkoutDetail,
  updateWorkout,
} from '../controllers/workoutController';

const router = Router();

router.get('/workouts', getAllWorkout);
router.post('/workouts', createWorkout);
router.delete('/workouts/:id', removeWorkout);
router.patch('/workouts/:id', updateWorkout);
router.post('/workouts/details', addDeatilWorkout);
router.get('/workouts/details', getDeatilWorkout);
router.delete('/workouts/details/:id', removeWorkoutDetail);

export default router;
