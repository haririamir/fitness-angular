import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../prismaClient';
import { workoutSchema } from '../middleware/validationMiddleware';

const validateSchema = (body: any) => {
  return workoutSchema.validate(body);
};

export const getAllWorkout = async (
  req: Request,
  res: Response
): Promise<void> => {
  const workout = await prisma.workout.findMany();
  res.json(workout);
};

export const createWorkout = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error } = validateSchema(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  let workout: Prisma.WorkoutCreateInput;
  workout = {
    name: req.body.name,
    description: req.body.description,
  };
  const create = await prisma.workout.create({ data: workout });
  res.json(create);
};

export const updateWorkout = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  const { error } = validateSchema(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  if (!id) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  const workout = {
    name: req.body.name,
    description: req.body.description,
  };
  const update = await prisma.workout.update({
    where: {
      workout_id: id,
    },
    data: workout,
  });
  res.json(update);
};

export const removeWorkout = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await prisma.workout.delete({
      where: {
        workout_id: id,
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

export const removeWorkoutDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await prisma.workoutDetail.delete({
      where: {
        detail_id: id,
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

export const addDeatilWorkout = async (
  req: Request,
  res: Response
): Promise<void> => {
  // const { error } = exerciseSchema.validate(req.body);

  // if (error) {
  //   res.status(400).json({ error: error.details[0].message });
  //   return;
  // }

  let workoutDetail: Prisma.WorkoutDetailCreateInput;
  workoutDetail = {
    base_weight: req.body.base_weight,
    sets: req.body.sets,
    reps: req.body.reps,
    workoutPlan: { connect: { plan_id: req.body.plan.plan_id } },
    exercise: { connect: { exercise_id: req.body.exercise.exercise_id } },
  };

  const create = await prisma.workoutDetail.create({ data: workoutDetail });
  res.json(create);
};

export const getDeatilWorkout = async (
  req: Request,
  res: Response
): Promise<void> => {
  // const { error } = exerciseSchema.validate(req.body);

  // if (error) {
  //   res.status(400).json({ error: error.details[0].message });
  //   return;
  // }

  const all = await prisma.workoutDetail.findMany({
    include: {
      workoutPlan: true,
      exercise: true,
    },
  });
  res.json(all);
};
