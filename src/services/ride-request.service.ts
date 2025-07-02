import { AppDataSource } from '../config/database.config';
import { RideRequest } from '../entities/ride-request.entity';
import { User } from '../entities/user.entity';
import { Ride } from '../entities/ride.entity';
import { RequestStatus } from '../entities/ride-request.entity';
import { CreateRideRequestData } from '../types/ride-request.types';

export class RideRequestService {
  private rideRequestRepository = AppDataSource.getRepository(RideRequest);
  private userRepository = AppDataSource.getRepository(User);
  private rideRepository = AppDataSource.getRepository(Ride);

  async createRideRequest(data: CreateRideRequestData) {
  const passenger = await this.userRepository.findOneBy({ id: data.passengerId });
  if (!passenger) throw new Error('Passenger not found');

  const rideRequest = this.rideRequestRepository.create({
    passenger,
    trainNumber: data.trainNumber,
    arrivalTime: data.arrivalTime,
    fromStation: data.fromStation,
    toLocation: data.toLocation,
    maxWaitTime: data.maxWaitTime,
    notes: data.notes,
    pickupLocation: data.pickupLocation || data.fromStation,
    dropoffLocation: data.dropoffLocation || data.toLocation,
    status: RequestStatus.PENDING,
    // ride: null // no ride linked yet
  });

  return await this.rideRequestRepository.save(rideRequest);
}



  async getRideRequestById(id: string) {
    const rideRequest = await this.rideRequestRepository.findOne({
      where: { id },
      relations: ['passenger', 'ride', 'ride.driver']
    });
    if (!rideRequest) throw new Error('Ride request not found');
    return rideRequest;
  }

  async updateRideRequestStatus(id: string, status: RequestStatus, userId: string) {
    const rideRequest = await this.rideRequestRepository.findOne({
      where: { id },
      relations: ['ride', 'ride.driver']
    });

    if (!rideRequest) throw new Error('Ride request not found');

    // Only driver can accept/reject requests
    if (rideRequest.ride.driver.id !== userId) {
      throw new Error('Only the ride driver can update request status');
    }

    rideRequest.status = status;
    return await this.rideRequestRepository.save(rideRequest);
  }

  async getPassengerRequests(passengerId: string) {
    return await this.rideRequestRepository.find({
      where: { passenger: { id: passengerId } },
      relations: ['ride', 'ride.driver'],
      order: { createdAt: 'DESC' }
    });
  }

  async getRideRequests(rideId: string, driverId: string) {
    const ride = await this.rideRepository.findOne({
      where: { id: rideId },
      relations: ['driver']
    });

    if (!ride) throw new Error('Ride not found');
    if (ride.driver.id !== driverId) throw new Error('Not authorized');

    return await this.rideRequestRepository.find({
      where: { ride: { id: rideId } },
      relations: ['passenger'],
      order: { createdAt: 'DESC' }
    });
  }

  async cancelRideRequest(id: string, passengerId: string) {
    const rideRequest = await this.rideRequestRepository.findOne({
      where: { id },
      relations: ['passenger']
    });

    if (!rideRequest) throw new Error('Ride request not found');
    if (rideRequest.passenger.id !== passengerId) {
      throw new Error('Only the passenger can cancel this request');
    }

    rideRequest.status = RequestStatus.CANCELLED;
    return await this.rideRequestRepository.save(rideRequest);
  }
}