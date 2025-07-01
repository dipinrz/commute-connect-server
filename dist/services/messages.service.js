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
exports.MessagesService = void 0;
const database_config_1 = require("../config/database.config");
const message_entity_1 = require("../entities/message.entity");
const user_entity_1 = require("../entities/user.entity");
class MessagesService {
    constructor() {
        this.messageRepository = database_config_1.AppDataSource.getRepository(message_entity_1.Message);
        this.userRepository = database_config_1.AppDataSource.getRepository(user_entity_1.User);
    }
    sendMessage(senderId, messageData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [sender, receiver] = yield Promise.all([
                this.userRepository.findOne({ where: { id: senderId } }),
                this.userRepository.findOne({ where: { id: messageData.receiverId } })
            ]);
            if (!sender || !receiver) {
                throw new Error('Sender or receiver not found');
            }
            const message = this.messageRepository.create({
                content: messageData.content,
                sender,
                receiver
            });
            const savedMessage = yield this.messageRepository.save(message);
            return this.messageRepository.findOne({
                where: { id: savedMessage.id },
                relations: ['sender', 'receiver'],
                select: {
                    id: true,
                    content: true,
                    read: true,
                    readAt: true,
                    createdAt: true,
                    sender: { id: true, name: true, email: true, avatar: true },
                    receiver: { id: true, name: true, email: true, avatar: true }
                }
            });
        });
    }
    getConversations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversations = yield this.messageRepository
                .createQueryBuilder('message')
                .leftJoinAndSelect('message.sender', 'sender')
                .leftJoinAndSelect('message.receiver', 'receiver')
                .where('message.senderId = :userId OR message.receiverId = :userId', { userId })
                .orderBy('message.createdAt', 'DESC')
                .getMany();
            // Group by the other user in each conversation
            const conversationMap = new Map();
            for (const message of conversations) {
                const otherUserId = message.senderId === userId ? message.receiverId : message.senderId;
                const otherUser = message.senderId === userId ? message.receiver : message.sender;
                if (!conversationMap.has(otherUserId)) {
                    conversationMap.set(otherUserId, {
                        user: {
                            id: otherUser.id,
                            name: otherUser.name,
                            email: otherUser.email,
                            avatar: otherUser.avatar
                        },
                        lastMessage: message.content,
                        lastMessageAt: message.createdAt,
                        unreadCount: message.receiverId === userId && !message.read ? 1 : 0
                    });
                }
                else {
                    const existing = conversationMap.get(otherUserId);
                    if (message.createdAt > existing.lastMessageAt) {
                        existing.lastMessage = message.content;
                        existing.lastMessageAt = message.createdAt;
                    }
                    if (message.receiverId === userId && !message.read) {
                        existing.unreadCount++;
                    }
                }
            }
            return Array.from(conversationMap.values()).sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
        });
    }
    getMessagesBetweenUsers(userId, otherUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.messageRepository.find({
                where: [
                    { sender: { id: userId }, receiver: { id: otherUserId } },
                    { sender: { id: otherUserId }, receiver: { id: userId } }
                ],
                relations: ['sender', 'receiver'],
                order: { createdAt: 'ASC' },
                select: {
                    id: true,
                    content: true,
                    read: true,
                    readAt: true,
                    createdAt: true,
                    sender: { id: true, name: true, email: true, avatar: true },
                    receiver: { id: true, name: true, email: true, avatar: true }
                }
            });
        });
    }
    markMessagesAsRead(userId, senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.messageRepository.update({ sender: { id: senderId }, receiver: { id: userId }, read: false }, { read: true, readAt: new Date() });
        });
    }
}
exports.MessagesService = MessagesService;
