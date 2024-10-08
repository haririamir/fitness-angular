import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { planSchema } from '../middleware/validationMiddleware';
import prisma from '../prismaClient';

const validateSchema = (body: any) => {
  return planSchema.validate(body);
};

export const getPlans = async (req: Request, res: Response): Promise<void> => {
  const plans = await prisma.workoutPlan.findMany({
    select: {
      id: true,
      workout_id: true,
      user_id: true,
      user: true,
      workout: true,
      start_date: true,
      end_date: true,
      workoutDetails: {
        select: {
          id: true,
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
    user: { connect: { id: req.body.user_id } },
    workout: { connect: { id: req.body.workout_id } },
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };
  const create = await prisma.workoutPlan.create({
    data: plan,
    include: { user: true, workout: true },
  });
  res.json(create);
};

export const updatePlan = async (
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

  const plan = {
    user: { connect: { id: req.body.user_id } },
    workout: { connect: { id: req.body.workout_id } },
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };
  const update = await prisma.workoutPlan.update({
    where: {
      id,
    },
    data: plan,
  });
  res.json(update);
};

export const deletePlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await prisma.workoutPlan.delete({
      where: {
        id,
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
