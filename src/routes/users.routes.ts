// src/routes/users.routes.ts
import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { updateUserSchema } from '../validations/users.validation';

const router = Router();
const usersController = new UsersController();

// Protected routes (require authentication)
router.use(authMiddleware);

router.get('/profile', usersController.getProfile);
router.put('/profile', validate(updateUserSchema), usersController.updateProfile);
router.get('/building/:building', usersController.getBuildingUsers);

export default router;