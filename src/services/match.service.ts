import { AppDataSource } from '../config/database.config';
import { Ride, RideStatus } from '../entities/ride.entity';
import { RideRequest, RequestStatus } from '../entities/ride-request.entity';
import { Between, Raw } from 'typeorm';

export class MatchService {
  private rideRepo = AppDataSource.getRepository(Ride);
  private requestRepo = AppDataSource.getRepository(RideRequest);

  // Matching rides for a ride request
  async findMatchingRides(requestId: string) {
    const request = await this.requestRepo.findOneBy({ id: requestId });
    if (!request) throw new Error('Ride request not found');

    const timeStart = new Date(request.arrivalTime);
    const timeEnd = new Date(timeStart.getTime() + request.maxWaitTime * 60 * 1000);

    const rides = await this.rideRepo.find({
      where: {
        departureStation: Raw(alias => `${alias} ILIKE :from`, { from: `%${request.fromStation}%` }),
        arrivalStation: Raw(alias => `${alias} ILIKE :to`, { to: `%${request.toLocation}%` }),
        departureTime: Between(timeStart, timeEnd),
        status: RideStatus.PENDING,
        availableSeats: Raw(alias => `${alias} > 0`),
      },
      relations: ['driver'],
      order: { departureTime: 'ASC' },
    });

    return rides.map(ride => ({
      id: ride.id,
      departureStation: ride.departureStation,
      arrivalStation: ride.arrivalStation,
      departureTime: ride.departureTime,
      driver: {
        name: ride.driver.name,
        rating: ride.driver.rating,
        company: ride.driver.company,
        avatar: ride.driver.avatar,
      },
      vehicleInfo: ride.vehicleInformation,
      availableSeats: ride.availableSeats,
      matchScore: this.calculateMatchScore(request, ride),
      routeDetails: ride.routeDetails || '',
    }));
  }

  // Matching ride requests for a ride offer
  async findMatchingRequests(rideId: string) {
    const ride = await this.rideRepo.findOneBy({ id: rideId });
    if (!ride) throw new Error('Ride offer not found');

    const timeStart = new Date(ride.departureTime.getTime() - 30 * 60000); // 30 mins before
    const timeEnd = new Date(ride.departureTime.getTime() + 30 * 60000);  // 30 mins after

    const requests = await this.requestRepo.find({
      where: {
        fromStation: Raw(alias => `${alias} ILIKE :from`, { from: `%${ride.departureStation}%` }),
        toLocation: Raw(alias => `${alias} ILIKE :to`, { to: `%${ride.arrivalStation}%` }),
        arrivalTime: Between(timeStart, timeEnd),
        status: RequestStatus.PENDING,
      },
      relations: ['passenger'],
      order: { arrivalTime: 'ASC' },
    });

    return requests.map(req => ({
      id: req.id,
      fromStation: req.fromStation,
      toLocation: req.toLocation,
      arrivalTime: req.arrivalTime,
      passenger: {
        name: req.passenger.name,
        email: req.passenger.email,
        avatar: req.passenger.avatar,
      },
      notes: req.notes,
      pickupLocation: req.pickupLocation,
      dropoffLocation: req.dropoffLocation,
      matchScore: this.calculateRequestScore(req, ride),
    }));
  }

  private calculateMatchScore(request: RideRequest, ride: Ride): number {
    let score = 100;
    if (ride.departureStation !== request.fromStation) score -= 20;
    if (ride.arrivalStation !== request.toLocation) score -= 20;
    const timeDiff = Math.abs(ride.departureTime.getTime() - request.arrivalTime.getTime()) / 60000;
    if (timeDiff > 10) score -= Math.min(30, timeDiff);
    return Math.max(50, score);
  }

  private calculateRequestScore(request: RideRequest, ride: Ride): number {
    return this.calculateMatchScore(request, ride); // Same logic reused
  }
}
