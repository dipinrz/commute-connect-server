// src/services/rides.service.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database.config";
import { Ride } from "../entities/ride.entity";
import { User } from "../entities/user.entity";
import { CreateRideData, FindRidesParams, RideWithDriver } from "../types/rides.types";

export class RidesService {
  private rideRepository: Repository<Ride>;

  constructor() {
    this.rideRepository = AppDataSource.getRepository(Ride);
  }

  async createRide(rideData: any) {
    const ride = this.rideRepository.create({
      ...rideData,
      status: 'pending',
    });

    return await this.rideRepository.save(ride);
  }

  async findRides(params: FindRidesParams): Promise<RideWithDriver[]> {
    const query = this.rideRepository
      .createQueryBuilder('ride')
      .leftJoinAndSelect('ride.driver', 'driver')
      .where('driver.workBuilding = :workBuilding', { 
        workBuilding: params.workBuilding 
      })
      .andWhere('ride.status = :status', { status: 'pending' })
      .select([
        'ride',
        'driver.id',
        'driver.name',
        'driver.email',
        'driver.workBuilding',
        'driver.company',
        'driver.avatar',
        'driver.rating'
      ]);

    if (params.departureTime) {
      query.andWhere('ride.departureTime >= :departureTime', { 
        departureTime: params.departureTime 
      });
    }

    if (params.limit) {
      query.limit(params.limit);
    }

    return await query.getMany() as RideWithDriver[];
  }


  async findUserRides(params: any) {
    const { userId, status, limit } = params;
    
    const query = this.rideRepository
      .createQueryBuilder('ride')
      .leftJoinAndSelect('ride.driver', 'driver')
      .where('ride.driver_id = :userId', { userId })
      .select([
        'ride',
        'driver.id',
        'driver.name',
        'driver.email',
        'driver.workBuilding',
        'driver.company',
        'driver.avatar',
        'driver.rating'
      ]);

    if (status) {
      query.andWhere('ride.status = :status', { status });
    }

    if (limit) {
      query.limit(limit);
    }

    query.orderBy('ride.departureTime', 'DESC');

    return await query.getMany() as RideWithDriver[];
  }

  async findRideById(id: string): Promise<Ride | null> {
    return await this.rideRepository.findOne({ 
      where: { id },
      relations: ['driver']
    });
  }

  async updateRideStatus(id: string, status: 'active' | 'completed' | 'cancelled'| any): Promise<Ride | null> {
    await this.rideRepository.update(id, { status });
    return this.findRideById(id);
  }
}