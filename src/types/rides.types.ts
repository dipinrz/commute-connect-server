// src/types/rides.types.ts
import { User } from "../entities/user.entity";
import { Ride } from "../entities/ride.entity";

export interface CreateRideData {
  trainNumber: string;
  departureStation: string;
  arrivalStation: string;
  departureTime: Date;
  availableSeats: number;
  driver: User;
}

export interface FindRidesParams {
  workBuilding: string;
  departureTime?: Date;
  limit?: number;
}

export interface RideWithDriver extends Ride {
  driver: Omit<User, 'password'>;
}