import Joi from 'joi';
import { RequestStatus } from '../entities/ride-request.entity';

export const createRideRequestSchema = Joi.object({
  rideId: Joi.string().uuid(),
  trainNumber: Joi.string().required(),
  arrivalTime: Joi.date().iso().required(),
  fromStation: Joi.string().required(),
  toLocation: Joi.string().required(),
  maxWaitTime: Joi.number().integer().min(5).max(60).default(10),
  notes: Joi.string().allow('').optional(),
  pickupLocation: Joi.string().optional(),
  dropoffLocation: Joi.string().optional()
});

export const updateRideRequestStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(RequestStatus))
    .required()
});