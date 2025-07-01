// src/types/rides.types.ts
import { User } from "../entities/user.entity";
import { Ride } from "../entities/ride.entity";

export interface CreateRideData {
  trainNumber: string;
  departureStation: string;
  arrivalStation: string;
  departureTime: Date;
  availableSeats: number;
  routeDetails?: string | null;
  additionalDetails?: string | null;
  vehicleInformation: string;

  driver: User;
}

export interface FindRidesParams {
  workBuilding: string;
  departureTime?: Date;
  limit?: number;
}

export type RideWithDriver = Omit<Ride, 'driver'> & {
  driver: Omit<User, 'password'>;
};

export enum RideStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
