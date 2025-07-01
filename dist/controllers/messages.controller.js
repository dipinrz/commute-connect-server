"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesController = void 0;
const messages_service_1 = require("../services/messages.service");
class MessagesController {
    constructor() {
        this.sendMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const messageData = req.body;
                const message = yield this.messagesService.sendMessage(req.user.id, messageData);
                res.status(201).json({
                    success: true,
                    data: message
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.getConversations = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conversations = yield this.messagesService.getConversations(req.user.id);
                res.status(200).json({
                    success: true,
                    data: conversations
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.getMessages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const otherUserId = req.params.userId;
                // Mark messages as read when fetching
                yield this.messagesService.markMessagesAsRead(req.user.id, otherUserId);
                const messages = yield this.messagesService.getMessagesBetweenUsers(req.user.id, otherUserId);
                res.status(200).json({
                    success: true,
                    data: messages
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.messagesService = new messages_service_1.MessagesService();
    }
    handleError(res, error) {
        const message = error instanceof Error ? error.message : 'Message operation failed';
        res.status(400).json({
            success: false,
            error: message
        });
    }
}
exports.MessagesController = MessagesController;
