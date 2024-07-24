import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  console.log(users)
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});