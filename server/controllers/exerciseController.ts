import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { exerciseSchema } from '../middleware/validationMiddleware';
import prisma from '../prismaClient';

export const getExercises = async (
  req: Request,
  res: Response
): Promise<void> => {
  const exercises = await prisma.exercise.findMany();
  res.json(exercises);
};
export const getExerciseCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = await prisma.category.findMany();
  res.json(data);
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
    category: { connect: { category_id: req.body.category.category_id } },
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
    category: { connect: { category_id: req.body.category.category_id } },
  };
  const update = await prisma.exercise.update({
    where: {
      exercise_id: id,
    },
    data: exercise,
  });
  res.json(update);
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
