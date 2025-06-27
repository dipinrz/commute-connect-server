// src/types/buildings.types.ts
import { Building } from "../entities/building.entity";

export interface CreateBuildingData {
  name: string;
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
  amenities?: {
    parking: boolean;
    cafeteria: boolean;
    security: boolean;
  };
  contactEmail?: string;
  contactPhone?: string;
}

export interface UpdateBuildingData extends Partial<CreateBuildingData> {}

export interface BuildingWithStats extends Building {
  userCount: number;
  activeRides: number;
}