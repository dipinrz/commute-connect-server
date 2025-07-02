// src/services/match.service.ts
import { AppDataSource } from "../config/database.config";
import { Ride, RideStatus } from "../entities/ride.entity";
import { RideRequest } from "../entities/ride-request.entity";
import { Between, Raw } from "typeorm";

export class MatchService {
  private rideRepo = AppDataSource.getRepository(Ride);
  private requestRepo = AppDataSource.getRepository(RideRequest);

  async findMatchingRides(requestId: string) {
    const request = await this.requestRepo.findOneBy({ id: requestId });
    if (!request) throw new Error("Ride request not found");

    const timeStart = new Date(request.arrivalTime);
    const timeEnd = new Date(
      timeStart.getTime() + request.maxWaitTime * 60 * 1000
    ); // in ms
    const rides = await this.rideRepo.find({
      where: {
        departureStation: Raw((alias) => `${alias} ILIKE :from`, {
          from: `%${request.fromStation}%`,
        }),
        arrivalStation: Raw((alias) => `${alias} ILIKE :to`, {
          to: `%${request.toLocation}%`,
        }),
        departureTime: Between(timeStart, timeEnd),
        status: RideStatus.PENDING,
        availableSeats: Raw((alias) => `${alias} > 0`),
      },
      relations: ["driver"],
      order: { departureTime: "ASC" },
    });

    return rides.map((ride) => ({
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
      routeDetails: ride.routeDetails || "",
    }));
  }

  private calculateMatchScore(request: RideRequest, ride: Ride): number {
    let score = 100;

    if (ride.departureStation !== request.fromStation) score -= 20;
    if (ride.arrivalStation !== request.toLocation) score -= 20;

    const timeDiff =
      Math.abs(
        new Date(ride.departureTime).getTime() -
          new Date(request.arrivalTime).getTime()
      ) / 60000;
    if (timeDiff > 10) score -= Math.min(30, timeDiff); // penalize if far off

    return Math.max(50, score); // minimum 50%
  }
}
