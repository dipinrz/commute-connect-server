// src/services/users.service.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database.config";
import { User } from "../entities/user.entity";
import { Ride } from "../entities/ride.entity";
import { UpdateUserData, UserProfile } from "../types/users.types";

export class UsersService {
  private userRepository: Repository<User>;
  private rideRepository: Repository<Ride>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.rideRepository = AppDataSource.getRepository(Ride);
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'name', 'email', 'workBuilding', 'company', 'avatar', 'rating', 'isDriver', 'vehicleInfo']
    });

    if (!user) {
      throw new Error('User not found');
    }

    const [upcomingRides, pastRides]:any = await Promise.all([
      this.rideRepository.find({
        where: { driver: { id: userId }, status: 'pending' },
        relations: ['driver']
      }),
      this.rideRepository.find({
        where: { driver: { id: userId }, status: 'completed' },
        relations: ['driver']
      })
    ]);

    return {
      ...user,
      upcomingRides,
      pastRides
    };
  }

  async updateUser(userId: string, updateData: UpdateUserData): Promise<User> {
    await this.userRepository.update(userId, updateData);
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'name', 'email', 'workBuilding', 'company', 'avatar', 'rating', 'isDriver', 'vehicleInfo']
    });

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  async getUsersByBuilding(building: string): Promise<User[]> {
    return await this.userRepository.find({
      where: { workBuilding: building },
      select: ['id', 'name', 'email', 'workBuilding', 'company', 'avatar', 'rating']
    });
  }
}