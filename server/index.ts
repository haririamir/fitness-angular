import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
const cors = require('cors');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(cors());
app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  console.log(users);
  res.json(users);
});
app.get('/api/exercises', async (req, res) => {
  const exercises = await prisma.exercise.findMany();
  res.json(exercises);
});
app.post('/api/exercises', async (req, res) => {
  let exercise: Prisma.ExerciseCreateInput;
  exercise = {
    name: req.body.name,
    description: req.body.description,
  };
  const create = await prisma.exercise.create({ data: exercise });
  res.json(create);
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
