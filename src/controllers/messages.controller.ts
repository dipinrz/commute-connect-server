// src/controllers/messages.controller.ts
import { Request, Response } from "express";
import { MessagesService } from "../services/messages.service";
import { CreateMessageData } from "../types/messages.types";

export class MessagesController {
  private messagesService: MessagesService;

  constructor() {
    this.messagesService = new MessagesService();
  }

  sendMessage = async (req: any, res: Response) => {
    try {
      const messageData: CreateMessageData = req.body;
      const message = await this.messagesService.sendMessage(req.user.id, messageData);
      res.status(201).json({
        success: true,
        data: message
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getConversations = async (req: any, res: Response) => {
    try {
      const conversations = await this.messagesService.getConversations(req.user.id);
      res.status(200).json({
        success: true,
        data: conversations
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getMessages = async (req: any, res: Response) => {
    try {
      const otherUserId = req.params.userId;
      
      // Mark messages as read when fetching
      await this.messagesService.markMessagesAsRead(req.user.id, otherUserId);
      
      const messages = await this.messagesService.getMessagesBetweenUsers(
        req.user.id,
        otherUserId
      );
      res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown) {
    const message = error instanceof Error ? error.message : 'Message operation failed';
    res.status(400).json({
      success: false,
      error: message
    });
  }
}