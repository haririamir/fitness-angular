import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { planSchema } from '../middleware/validationMiddleware';
import prisma from '../prismaClient';

export const getPlans = async (req: Request, res: Response): Promise<void> => {
  const plans = await prisma.workoutPlan.findMany({
    select: {
      plan_id: true,
      workout_id: true,
      user_id: true,
      user: true,
      workout: true,
      start_date: true,
      end_date: true,
      workoutDetails: {
        select: {
          exercise: true,
          sets: true,
          reps: true,
          base_weight: true,
        },
      },
    },
  });
  res.json(plans);
};

export const createPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error } = planSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  let plan: Prisma.WorkoutPlanCreateInput;
  plan = {
    user: { connect: { user_id: req.body.user_id } },
    workout: { connect: { workout_id: req.body.workout_id } },
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };
  const create = await prisma.workoutPlan.create({ data: plan });
  res.json(create);
};

export const updateExercise = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  const { error } = planSchema.validate(req.body);

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
