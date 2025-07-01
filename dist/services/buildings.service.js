"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingsService = void 0;
const database_config_1 = require("../config/database.config");
const building_entity_1 = require("../entities/building.entity");
const user_entity_1 = require("../entities/user.entity");
const ride_entity_1 = require("../entities/ride.entity");
class BuildingsService {
    constructor() {
        this.buildingRepository = database_config_1.AppDataSource.getRepository(building_entity_1.Building);
        this.userRepository = database_config_1.AppDataSource.getRepository(user_entity_1.User);
        this.rideRepository = database_config_1.AppDataSource.getRepository(ride_entity_1.Ride);
    }
    createBuilding(buildingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const building = this.buildingRepository.create(Object.assign(Object.assign({}, buildingData), { location: buildingData.location
                    ? `(${buildingData.location.lat},${buildingData.location.lng})`
                    : undefined }));
            return yield this.buildingRepository.save(building);
        });
    }
    getAllBuildings() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.buildingRepository.find({
                order: { name: 'ASC' }
            });
        });
    }
    getBuildingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const building = yield this.buildingRepository.findOne({
                where: { id }
            });
            if (!building)
                return null;
            const [userCount, activeRides] = yield Promise.all([
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
            return Object.assign(Object.assign({}, building), { userCount,
                activeRides });
        });
    }
    updateBuilding(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatePayload = Object.assign({}, updateData);
            if (updateData.location) {
                updatePayload.location = `(${updateData.location.lat},${updateData.location.lng})`;
            }
            yield this.buildingRepository.update(id, updatePayload);
            return this.buildingRepository.findOne({ where: { id } });
        });
    }
    searchBuildings(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.buildingRepository
                .createQueryBuilder('building')
                .where('LOWER(building.name) LIKE LOWER(:query)', { query: `%${query}%` })
                .orWhere('LOWER(building.address) LIKE LOWER(:query)', { query: `%${query}%` })
                .orderBy('building.name', 'ASC')
                .getMany();
        });
    }
}
exports.BuildingsService = BuildingsService;
