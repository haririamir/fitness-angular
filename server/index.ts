import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import {
  exerciseSchema,
  validateSchema,
} from './middleware/validationMiddleware';
const cors = require('cors');
const app = express();
const prisma = new PrismaClient();

export const exerciseValidato = [
  body('exercise.name', 'username does not Empty').not().isEmpty(),
  body('exercise.description', 'does not Empty').isEmpty(),
  body('user.category', 'does not Empty').isEmpty(),
];

app.use(express.json());
app.use(cors());
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  }
);

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  console.log(users);
  res.json(users);
});

app.get('/api/exercises', async (req, res) => {
  const exercises = await prisma.exercise.findMany();
  res.json(exercises);
});

app.post(
  '/api/exercises',
  validateSchema(exerciseSchema),
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      let exercise: Prisma.ExerciseCreateInput;
      exercise = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
      };
      const create = await prisma.exercise.create({ data: exercise });
      res.json(create);
    }
  }
);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
