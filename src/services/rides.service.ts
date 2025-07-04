// src/services/rides.service.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database.config";
import { Ride, RideStatus } from "../entities/ride.entity";
import { User } from "../entities/user.entity";
import {
  CreateRideData,
  FindRidesParams,
  RideWithDriver,
  
} from "../types/rides.types";
import { RequestStatus, RideRequest } from "../entities/ride-request.entity";

export class RidesService {
  private rideRepository: Repository<Ride>;
  private rideRequestRepo: Repository<RideRequest>;

  constructor() {
    this.rideRepository = AppDataSource.getRepository(Ride);
    this.rideRequestRepo = AppDataSource.getRepository(RideRequest);
  }

  async createRide(rideData: any) {
    const ride = this.rideRepository.create({
      ...rideData,
      status: "pending",
    });

    return await this.rideRepository.save(ride);
  }

  async findRides(params: FindRidesParams): Promise<RideWithDriver[]> {
    const query = this.rideRepository
      .createQueryBuilder("ride")
      .leftJoinAndSelect("ride.driver", "driver")
      .where("driver.workBuilding = :workBuilding", {
        workBuilding: params.workBuilding,
      })
      .andWhere("ride.status = :status", { status: "pending" })
      .select([
        "ride",
        "driver.id",
        "driver.name",
        "driver.email",
        "driver.workBuilding",
        "driver.company",
        "driver.avatar",
        "driver.rating",
      ]);

    if (params.departureTime) {
      query.andWhere("ride.departureTime >= :departureTime", {
        departureTime: params.departureTime,
      });
    }

    if (params.limit) {
      query.limit(params.limit);
    }

    return (await query.getMany()) as RideWithDriver[];
  }

  async findUserRides(params: any) {
    const { userId, status, limit } = params;

    const query = this.rideRepository
      .createQueryBuilder("ride")
      .leftJoinAndSelect("ride.driver", "driver")
      .where("ride.driver_id = :userId", { userId })
      .select([
        "ride",
        "driver.id",
        "driver.name",
        "driver.email",
        "driver.workBuilding",
        "driver.company",
        "driver.avatar",
        "driver.rating",
      ]);

    if (status) {
      query.andWhere("ride.status = :status", { status });
    }

    if (limit) {
      query.limit(limit);
    }

    query.orderBy("ride.departureTime", "DESC");

    return (await query.getMany()) as RideWithDriver[];
  }

  async findRideById(id: string): Promise<Ride | null> {
    return await this.rideRepository.findOne({
      where: { id },
      relations: ["driver"],
    });
  }

  async updateRideStatus(
    id: string,
    status: "active" | "completed" | "cancelled" | any
  ): Promise<Ride | null> {
    await this.rideRepository.update(id, { status });
    return this.findRideById(id);
  }

  async cancelRideOffer(id: string, driverId: string): Promise<Ride> {
    // Find the ride with driver relation
    const ride = await this.rideRepository.findOne({
      where: { id },
      relations: ["driver"],
    });

    if (!ride) {
      throw new Error("Ride offer not found");
    }

    if (ride.driver.id !== driverId) {
      throw new Error("Only the driver can cancel this ride offer");
    }

    if (ride.status === "cancelled") {
      throw new Error("Ride offer is already cancelled");
    }

    // Update status to cancelled
    ride.status = RideStatus.CANCELLED;
    return this.rideRepository.save(ride);

    // Alternative using your demo method:
    // return this.updateRideStatus(id, 'cancelled');
  }

  async confirmRideOffer(rideId: string, requestId: string, driverId: string) {
    const ride = await this.rideRepository.findOne({
      where: { id: rideId },
      relations: ["driver"],
    });

    if (!ride) throw new Error("Ride not found");
    if (ride.driver.id !== driverId)
      throw new Error("You are not authorized to confirm this ride");

    const rideRequest = await this.rideRequestRepo.findOne({
      where: { id: requestId },
      relations: ["ride"],
    });

    if (!rideRequest) throw new Error("Ride request not found");
    if (ride.availableSeats <= 0) throw new Error("No available seats");

    rideRequest.ride = ride;
    rideRequest.status = RequestStatus.ACCEPTED;

    ride.availableSeats -= 1;

    await this.rideRepository.save(ride);
    return await this.rideRequestRepo.save(rideRequest);
  }
}
