import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { exerciseSchema } from '../middleware/validationMiddleware';
import prisma from '../prismaClient';

export const getUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const createExercise = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error } = exerciseSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  let exercise: Prisma.ExerciseCreateInput;
  exercise = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
  };
  const create = await prisma.exercise.create({ data: exercise });
  res.json(create);
};

export const updateExercise = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  const { error } = exerciseSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  if (!id) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
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
};

export const deleteExercise = async (
  req: Request,
  res: Response
): Promise<void> => {
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
      res.status(404).send({ message: 'Item not found' });
    }
    res.status(500).send({ message: 'Server error', error });
  }
};
