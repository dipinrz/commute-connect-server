// src/validations/users.validation.ts
import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  workBuilding: Joi.string(),
  company: Joi.string(),
  designation: Joi.string(),
  avatar: Joi.string().uri(),
  email: Joi.string().required(),

  isDriver: Joi.boolean(),
  vehicleInfo: Joi.object({
    type: Joi.string().required(),
    model: Joi.string().required(),
    licensePlate: Joi.string().required(),
    capacity: Joi.number().integer().min(1).required(),
  }).when("isDriver", {
    is: true,
    then: Joi.object().required(),
  }),
}).min(1); // At least one field required
