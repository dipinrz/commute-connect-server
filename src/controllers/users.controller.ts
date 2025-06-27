// src/controllers/users.controller.ts
import { Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { authMiddleware } from "../middlewares/auth.middleware";

export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  getProfile = async (req: Request, res: Response) => {
    try {
      const profile = await this.usersService.getUserProfile(req.user.id);
      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  updateProfile = async (req: Request, res: Response) => {
    try {
      const updatedUser = await this.usersService.updateUser(req.user.id, req.body);
      res.status(200).json({
        success: true,
        data: updatedUser
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getBuildingUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.usersService.getUsersByBuilding(req.params.building);
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown) {
    const message = error instanceof Error ? error.message : 'User operation failed';
    const status = message === 'User not found' ? 404 : 400;
    res.status(status).json({
      success: false,
      error: message
    });
  }
}