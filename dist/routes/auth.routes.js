"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auth_validation_1 = require("../validations/auth.validation");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
// Public routes
router.post('/register', (0, validation_middleware_1.validate)(auth_validation_1.registerSchema), authController.register);
router.post('/login', (0, validation_middleware_1.validate)(auth_validation_1.loginSchema), authController.login);
// Protected route (requires authentication)
router.get('/me', auth_middleware_1.authMiddleware, authController.me);
exports.default = router;
