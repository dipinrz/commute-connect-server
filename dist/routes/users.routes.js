"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/users.routes.ts
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const users_validation_1 = require("../validations/users.validation");
const router = (0, express_1.Router)();
const usersController = new users_controller_1.UsersController();
// Protected routes (require authentication)
router.use(auth_middleware_1.authMiddleware);
router.get('/profile', usersController.getProfile);
router.put('/profile', (0, validation_middleware_1.validate)(users_validation_1.updateUserSchema), usersController.updateProfile);
router.get('/building/:building', usersController.getBuildingUsers);
exports.default = router;
