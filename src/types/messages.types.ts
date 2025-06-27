// src/types/messages.types.ts
import { User } from "../entities/user.entity";

export interface CreateMessageData {
  content: string;
  receiverId: string;
}

export interface MessageWithRelations {
  id: string;
  content: string;
  read: boolean;
  readAt?: Date;
  createdAt: Date;
  sender: Pick<User, 'id' | 'name' | 'email' | 'avatar'>;
  receiver: Pick<User, 'id' | 'name' | 'email' | 'avatar'>;
}

export interface Conversation {
  user: Pick<User, 'id' | 'name' | 'email' | 'avatar'>;
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: number;
}