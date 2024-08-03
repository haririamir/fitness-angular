import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateSchema = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ errors: error.details });
    } else {
      next();
    }
  };
};

export const exerciseSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().max(255).required(),
  category: Joi.string(),
});

export const planSchema = Joi.object({
  user_id: Joi.number().required(),
  workout_id: Joi.number().required(),
  start_date: Joi.string(),
  end_date: Joi.string(),
});
export const workoutSchema = Joi.object({
  workout_id: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string(),
});

export const userSchema = Joi.object({
  user_id: Joi.number().required(),
  username: Joi.string().required(),
  email: Joi.string(),
  password: Joi.string().required(),
  end_date: Joi.string(),
});
