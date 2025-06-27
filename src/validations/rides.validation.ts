// src/validations/rides.validation.ts
import Joi from 'joi';

export const createRideSchema = Joi.object({
  trainNumber: Joi.string().required(),
  departureStation: Joi.string().required(),
  arrivalStation: Joi.string().required(),
  departureTime: Joi.date().iso().required(),
  availableSeats: Joi.number().integer().min(1).required(),
});

export const updateRideStatusSchema = Joi.object({
  status: Joi.string().valid('active', 'completed', 'cancelled').required(),
});