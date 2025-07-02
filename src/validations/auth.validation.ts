// src/validations/auth.validation.ts
import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  workBuilding: Joi.string().required(),
  company: Joi.string().optional(),
  designation: Joi.string().optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
