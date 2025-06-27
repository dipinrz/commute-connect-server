// src/validations/buildings.validation.ts
import Joi from 'joi';

const locationSchema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required()
});

const amenitiesSchema = Joi.object({
  parking: Joi.boolean().required(),
  cafeteria: Joi.boolean().required(),
  security: Joi.boolean().required()
});

export const createBuildingSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  address: Joi.string().required().min(10).max(255),
  location: locationSchema.optional(),
  amenities: amenitiesSchema.optional(),
  contactEmail: Joi.string().email().optional(),
  contactPhone: Joi.string().pattern(/^[0-9]{10,15}$/).optional()
});

export const updateBuildingSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  address: Joi.string().min(10).max(255),
  location: locationSchema.optional(),
  amenities: amenitiesSchema.optional(),
  contactEmail: Joi.string().email().optional(),
  contactPhone: Joi.string().pattern(/^[0-9]{10,15}$/).optional()
}).min(1);