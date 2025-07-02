// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginCredentials, RegisterData } from "../types/auth.types";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: any, res: any) => {
    try {
      const userData: RegisterData = req.body;
      const { user, token } = await this.authService.register(userData);

      // Omit password before sending any
      const { password, ...userWithoutPassword }: any = user;

      res.status(201).json({
        success: true,
        data: { user: userWithoutPassword, token },
      });
    } catch (error) {
      console.log(error);

      this.handleError(res, error);
    }
  };

  login = async (req: any, res: any) => {
    try {
      const credentials: LoginCredentials = req.body;
      const { user, token } = await this.authService.login(credentials);

      // Omit password before sending any
      const { password, ...userWithoutPassword }: any = user;

      res.status(200).json({
        success: true,
        data: { user: userWithoutPassword, token },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  me = async (req: any, res: any) => {
    try {
      // The user is attached to the any by the auth middleware
      const user = req.user;

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  private handleError(res: any, error: unknown) {
    const message =
      error instanceof Error ? error.message : "Authentication failed";
    res.status(400).json({
      success: false,
      error: message,
    });
  }
}
