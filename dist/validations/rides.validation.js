"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRideStatusSchema = exports.createRideSchema = void 0;
// src/validations/rides.validation.ts
const joi_1 = __importDefault(require("joi"));
exports.createRideSchema = joi_1.default.object({
    trainNumber: joi_1.default.string().required(),
    departureStation: joi_1.default.string().required(),
    arrivalStation: joi_1.default.string().required(),
    departureTime: joi_1.default.date().iso().required(),
    availableSeats: joi_1.default.number().integer().min(1).required(),
    vehicleInformation: joi_1.default.string().required(),
    routeDetails: joi_1.default.string(),
    additionalDetails: joi_1.default.string(),
});
exports.updateRideStatusSchema = joi_1.default.object({
    status: joi_1.default.string().valid("active", "completed", "cancelled").required(),
});
