// src/routes/rides.routes.ts
import { Router } from 'express';
import { RidesController } from '../controllers/rides.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createRideSchema, updateRideStatusSchema } from '../validations/rides.validation';

const router = Router();
const ridesController = new RidesController();

// Protected routes (require authentication)
router.use(authMiddleware);

router.post('/', validate(createRideSchema), ridesController.createRide);
router.get('/', ridesController.getAvailableRides);
router.get('/:id', ridesController.getRideDetails);
router.patch('/:id/status', validate(updateRideStatusSchema), ridesController.updateRideStatus);

export default router;