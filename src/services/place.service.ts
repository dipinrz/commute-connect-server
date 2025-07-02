import { AppDataSource } from "../config/database.config";
import { Place } from "../entities/place.entity";

const placeRepository = AppDataSource.getRepository(Place);

export const createPlace = async (placeName: string): Promise<Place> => {
  const newPlace = placeRepository.create({ place: placeName });
  return await placeRepository.save(newPlace);
};

export const getAllPlaces = async (): Promise<Place[]> => {
  return await placeRepository.find();
};