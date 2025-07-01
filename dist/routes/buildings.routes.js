"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/buildings.routes.ts
const express_1 = require("express");
const buildings_controller_1 = require("../controllers/buildings.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const buildings_validation_1 = require("../validations/buildings.validation");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = (0, express_1.Router)();
const buildingsController = new buildings_controller_1.BuildingsController();
// Public routes
router.get('/', buildingsController.getAllBuildings);
router.get('/search', buildingsController.searchBuildings);
router.get('/:id', buildingsController.getBuildingDetails);
// Admin-protected routes
router.use(auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware);
router.post('/', (0, validation_middleware_1.validate)(buildings_validation_1.createBuildingSchema), buildingsController.createBuilding);
router.put('/:id', (0, validation_middleware_1.validate)(buildings_validation_1.updateBuildingSchema), buildingsController.updateBuilding);
exports.default = router;
