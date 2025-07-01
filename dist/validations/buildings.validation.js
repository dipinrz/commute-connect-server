"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBuildingSchema = exports.createBuildingSchema = void 0;
// src/validations/buildings.validation.ts
const joi_1 = __importDefault(require("joi"));
const locationSchema = joi_1.default.object({
    lat: joi_1.default.number().required(),
    lng: joi_1.default.number().required()
});
const amenitiesSchema = joi_1.default.object({
    parking: joi_1.default.boolean().required(),
    cafeteria: joi_1.default.boolean().required(),
    security: joi_1.default.boolean().required()
});
exports.createBuildingSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(3).max(100),
    address: joi_1.default.string().required().min(10).max(255),
    location: locationSchema.optional(),
    amenities: amenitiesSchema.optional(),
    contactEmail: joi_1.default.string().email().optional(),
    contactPhone: joi_1.default.string().pattern(/^[0-9]{10,15}$/).optional()
});
exports.updateBuildingSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(100),
    address: joi_1.default.string().min(10).max(255),
    location: locationSchema.optional(),
    amenities: amenitiesSchema.optional(),
    contactEmail: joi_1.default.string().email().optional(),
    contactPhone: joi_1.default.string().pattern(/^[0-9]{10,15}$/).optional()
}).min(1);
