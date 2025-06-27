// src/services/messages.service.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database.config";
import { Message } from "../entities/message.entity";
import { User } from "../entities/user.entity";
import { CreateMessageData, MessageWithRelations, Conversation } from "../types/messages.types";

export class MessagesService {
  private messageRepository: Repository<Message>;
  private userRepository: Repository<User>;

  constructor() {
    this.messageRepository = AppDataSource.getRepository(Message);
    this.userRepository = AppDataSource.getRepository(User);
  }

  async sendMessage(senderId: string, messageData: CreateMessageData): Promise<MessageWithRelations> {
    const [sender, receiver] = await Promise.all([
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

    const savedMessage = await this.messageRepository.save(message);
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
    }) as Promise<MessageWithRelations>;
  }

  async getConversations(userId: string){
    const conversations:any = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .where('message.senderId = :userId OR message.receiverId = :userId', { userId })
      .orderBy('message.createdAt', 'DESC')
      .getMany();

    // Group by the other user in each conversation
    const conversationMap = new Map<string, Conversation>();

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
      } else {
        const existing = conversationMap.get(otherUserId)!;
        if (message.createdAt > existing.lastMessageAt) {
          existing.lastMessage = message.content;
          existing.lastMessageAt = message.createdAt;
        }
        if (message.receiverId === userId && !message.read) {
          existing.unreadCount++;
        }
      }
    }

    return Array.from(conversationMap.values()).sort((a, b) => 
      b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
    );
  }

  async getMessagesBetweenUsers(userId: string, otherUserId: string): Promise<MessageWithRelations[]> {
    return await this.messageRepository.find({
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
  }

  async markMessagesAsRead(userId: string, senderId: string): Promise<void> {
    await this.messageRepository.update(
      { sender: { id: senderId }, receiver: { id: userId }, read: false },
      { read: true, readAt: new Date() }
    );
  }
}