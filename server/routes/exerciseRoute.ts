import { Router } from 'express';
import {
  createExercise,
  deleteExercise,
  getExerciseCategories,
  getExercises,
  updateExercise,
} from '../controllers/exerciseController';

const router = Router();

router.get('/exercises', getExercises);
router.get('/exercises/categories', getExerciseCategories);
router.post('/exercises', createExercise);
router.patch('/exercises/:id', updateExercise);
router.delete('/exercises/:id', deleteExercise);

export default router;
