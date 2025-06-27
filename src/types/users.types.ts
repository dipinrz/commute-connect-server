// src/types/users.types.ts
import { User } from "../entities/user.entity";
import { Ride } from "../entities/ride.entity";

export interface UpdateUserData {
  name?: string;
  workBuilding?: string;
  company?: string;
  avatar?: string;
  isDriver?: boolean;
  vehicleInfo?: {
    type: string;
    model: string;
    licensePlate: string;
    capacity: number;
  };
}

export interface UserProfile extends Omit<User, 'password'> {
  upcomingRides: Ride[];
  pastRides: Ride[];
}