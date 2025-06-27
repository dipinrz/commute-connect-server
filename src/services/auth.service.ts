// src/services/auth.service.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database.config";
import { User } from "../entities/user.entity";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "../types/auth.types";

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // Create user
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    // Generate JWT token
    const token = this.generateToken(user);

    return { user, token };
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return { user, token };
  }

  private generateToken(user: User): string {
    const secret = process.env.JWT_SECRET;
    const expiresIn: any = process.env.JWT_EXPIRES_IN || "7d";
    const issuer = process.env.JWT_ISSUER || "commute-connect";

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const options: SignOptions = {
      expiresIn,
      issuer,
    };

    const token = jwt.sign(payload, secret as jwt.Secret, options);

    return token;
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        email: string;
      };

      return await this.userRepository.findOne({
        where: { id: decoded.id },
        select: [
          "id",
          "name",
          "email",
          "workBuilding",
          "company",
          "avatar",
          "rating",
        ],
      });
    } catch (error) {
      return null;
    }
  }
}
