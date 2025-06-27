// src/routes/buildings.routes.ts
import { Router } from 'express';
import { BuildingsController } from '../controllers/buildings.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createBuildingSchema, updateBuildingSchema } from '../validations/buildings.validation';
import { adminMiddleware } from '../middlewares/admin.middleware';

const router = Router();
const buildingsController = new BuildingsController();

// Public routes
router.get('/', buildingsController.getAllBuildings);
router.get('/search', buildingsController.searchBuildings);
router.get('/:id', buildingsController.getBuildingDetails);

// Admin-protected routes
router.use(authMiddleware, adminMiddleware);
router.post('/', validate(createBuildingSchema), buildingsController.createBuilding);
router.put('/:id', validate(updateBuildingSchema), buildingsController.updateBuilding);

export default router;