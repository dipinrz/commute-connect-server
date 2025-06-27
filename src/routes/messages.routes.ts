// src/routes/messages.routes.ts
import { Router } from 'express';
import { MessagesController } from '../controllers/messages.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createMessageSchema } from '../validations/messages.validation';

const router = Router();
const messagesController = new MessagesController();

// Protected routes (require authentication)
router.use(authMiddleware);

router.post('/', validate(createMessageSchema), messagesController.sendMessage);
router.get('/conversations', messagesController.getConversations);
router.get('/:userId', messagesController.getMessages);

export default router;