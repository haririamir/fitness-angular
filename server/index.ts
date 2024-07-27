import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  exerciseSchema,
  validateSchema,
} from './middleware/validationMiddleware';
const cors = require('cors');
const app = express();
const prisma = new PrismaClient();

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
    let exercise: Prisma.ExerciseCreateInput;
    exercise = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
    };
    const create = await prisma.exercise.create({ data: exercise });
    res.json(create);
  }
);

app.patch(
  '/api/exercises/:id',
  validateSchema(exerciseSchema),
  async (req: any, res: any) => {
    const id = parseInt(req.params.id);
    const exercise = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
    };
    const updateUser = await prisma.exercise.update({
      where: {
        exercise_id: id,
      },
      data: exercise,
    });
    res.json(updateUser);
  }
);

app.delete('/api/exercises/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.exercise.delete({
      where: {
        exercise_id: id,
      },
    });
    res.send({ message: 'Item deleted successfully' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.status(500).send({ message: 'Server error', error });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
