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
