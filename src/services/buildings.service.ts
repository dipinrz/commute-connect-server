// src/services/buildings.service.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database.config";
import { Building } from "../entities/building.entity";
import { User } from "../entities/user.entity";
import { Ride } from "../entities/ride.entity";
import { CreateBuildingData, UpdateBuildingData, BuildingWithStats } from "../types/buildings.types";

export class BuildingsService {
  private buildingRepository: Repository<Building>;
  private userRepository: Repository<User>;
  private rideRepository: Repository<Ride>;

  constructor() {
    this.buildingRepository = AppDataSource.getRepository(Building);
    this.userRepository = AppDataSource.getRepository(User);
    this.rideRepository = AppDataSource.getRepository(Ride);
  }

  async createBuilding(buildingData: CreateBuildingData): Promise<Building> {
    const building = this.buildingRepository.create({
      ...buildingData,
      location: buildingData.location
        ? `(${buildingData.location.lat},${buildingData.location.lng})`
        : undefined
    });
    return await this.buildingRepository.save(building);
  }

  async getAllBuildings(): Promise<Building[]> {
    return await this.buildingRepository.find({
      order: { name: 'ASC' }
    });
  }

  async getBuildingById(id: string): Promise<BuildingWithStats | null> {
    const building = await this.buildingRepository.findOne({
      where: { id }
    });

    if (!building) return null;

    const [userCount, activeRides] = await Promise.all([
      this.userRepository.count({
        where: { workBuilding: building.name }
      }),
      this.rideRepository
        .createQueryBuilder('ride')
        .leftJoin('ride.driver', 'driver')
        .where('ride.status = :status', { status: 'pending' })
        .andWhere('driver.workBuilding = :buildingName', { buildingName: building.name })
        .getCount()
    ]);


    return {
      ...building,
      userCount,
      activeRides
    };
  }

  async updateBuilding(id: string, updateData: UpdateBuildingData): Promise<Building | null> {
    const updatePayload: any = { ...updateData };

    if (updateData.location) {
      updatePayload.location = `(${updateData.location.lat},${updateData.location.lng})`;
    }

    await this.buildingRepository.update(id, updatePayload);
    return this.buildingRepository.findOne({ where: { id } });
  }

  async searchBuildings(query: string): Promise<Building[]> {
    return await this.buildingRepository
      .createQueryBuilder('building')
      .where('LOWER(building.name) LIKE LOWER(:query)', { query: `%${query}%` })
      .orWhere('LOWER(building.address) LIKE LOWER(:query)', { query: `%${query}%` })
      .orderBy('building.name', 'ASC')
      .getMany();
  }
}