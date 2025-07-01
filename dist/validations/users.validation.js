"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
// src/validations/users.validation.ts
const joi_1 = __importDefault(require("joi"));
exports.updateUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50),
    workBuilding: joi_1.default.string(),
    company: joi_1.default.string(),
    avatar: joi_1.default.string().uri(),
    email: joi_1.default.string().required(),
    isDriver: joi_1.default.boolean(),
    vehicleInfo: joi_1.default.object({
        type: joi_1.default.string().required(),
        model: joi_1.default.string().required(),
        licensePlate: joi_1.default.string().required(),
        capacity: joi_1.default.number().integer().min(1).required()
    }).when('isDriver', {
        is: true,
        then: joi_1.default.object().required()
    })
}).min(1); // At least one field required
