"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/messages.routes.ts
const express_1 = require("express");
const messages_controller_1 = require("../controllers/messages.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const messages_validation_1 = require("../validations/messages.validation");
const router = (0, express_1.Router)();
const messagesController = new messages_controller_1.MessagesController();
// Protected routes (require authentication)
router.use(auth_middleware_1.authMiddleware);
router.post('/', (0, validation_middleware_1.validate)(messages_validation_1.createMessageSchema), messagesController.sendMessage);
router.get('/conversations', messagesController.getConversations);
router.get('/:userId', messagesController.getMessages);
exports.default = router;
