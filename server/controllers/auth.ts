import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { userSchema } from '../middleware/validationMiddleware';
import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = 'your_jwt_secret';

export const regester = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash('hariri', 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user.user_id }, SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
