// src/validations/messages.validation.ts
import Joi from 'joi';

export const createMessageSchema = Joi.object({
  content: Joi.string().required().min(1).max(1000),
  receiverId: Joi.string().required()
});