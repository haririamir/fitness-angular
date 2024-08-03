import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { userSchema } from '../middleware/validationMiddleware';
import prisma from '../prismaClient';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  let user: Prisma.UserCreateInput;
  user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const create = await prisma.user.create({ data: user });
  res.json(create);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  const { error } = userSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  if (!id) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const update = await prisma.user.update({
    where: {
      user_id: id,
    },
    data: user,
  });
  res.json(update);
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await prisma.user.delete({
      where: {
        user_id: id,
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
