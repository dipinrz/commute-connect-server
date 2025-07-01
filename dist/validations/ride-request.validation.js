"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRideRequestStatusSchema = exports.createRideRequestSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const ride_request_entity_1 = require("../entities/ride-request.entity");
exports.createRideRequestSchema = joi_1.default.object({
    rideId: joi_1.default.string().uuid(),
    trainNumber: joi_1.default.string().required(),
    arrivalTime: joi_1.default.date().iso().required(),
    fromStation: joi_1.default.string().required(),
    toLocation: joi_1.default.string().required(),
    maxWaitTime: joi_1.default.number().integer().min(5).max(60).default(10),
    notes: joi_1.default.string().allow('').optional(),
    pickupLocation: joi_1.default.string().optional(),
    dropoffLocation: joi_1.default.string().optional()
});
exports.updateRideRequestStatusSchema = joi_1.default.object({
    status: joi_1.default.string()
        .valid(...Object.values(ride_request_entity_1.RequestStatus))
        .required()
});
