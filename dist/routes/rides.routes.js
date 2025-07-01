"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/rides.routes.ts
const express_1 = require("express");
const rides_controller_1 = require("../controllers/rides.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const rides_validation_1 = require("../validations/rides.validation");
const router = (0, express_1.Router)();
const ridesController = new rides_controller_1.RidesController();
// Protected routes (require authentication)
router.use(auth_middleware_1.authMiddleware);
router.get("/my-rides", ridesController.getUserRides);
router.post("/", (0, validation_middleware_1.validate)(rides_validation_1.createRideSchema), ridesController.createRide);
router.get("/", ridesController.getAvailableRides);
router.get("/:id", ridesController.getRideDetails);
router.patch("/:id/status", (0, validation_middleware_1.validate)(rides_validation_1.updateRideStatusSchema), ridesController.updateRideStatus);
exports.default = router;
