import { User } from "../entities/user.entity";
import { Ride } from "../entities/ride.entity";
import { RequestStatus } from "../entities/ride-request.entity";

export interface CreateRideRequestData {
  rideId: string;
  passengerId: string;
  pickupLocation: string;
  dropoffLocation: string;
  message?: string;
}

export interface UpdateRideRequestData {
  status?: RequestStatus;
  message?: string;
}

export interface RideRequestWithRelations {
  id: string;
  status: RequestStatus;
  message?: string;
  pickupLocation: string;
  dropoffLocation: string;
  passenger: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  ride: {
    id: string;
    departureStation: string;
    arrivalStation: string;
    departureTime: Date;
    driver: {
      id: string;
      name: string;
    };
  };
}