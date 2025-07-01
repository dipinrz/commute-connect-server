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
exports.RidesService = void 0;
const database_config_1 = require("../config/database.config");
const ride_entity_1 = require("../entities/ride.entity");
class RidesService {
    constructor() {
        this.rideRepository = database_config_1.AppDataSource.getRepository(ride_entity_1.Ride);
    }
    createRide(rideData) {
        return __awaiter(this, void 0, void 0, function* () {
            const ride = this.rideRepository.create(Object.assign(Object.assign({}, rideData), { status: 'pending' }));
            return yield this.rideRepository.save(ride);
        });
    }
    findRides(params) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return yield query.getMany();
        });
    }
    findRideById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.rideRepository.findOne({
                where: { id },
                relations: ['driver']
            });
        });
    }
    updateRideStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.rideRepository.update(id, { status });
            return this.findRideById(id);
        });
    }
}
exports.RidesService = RidesService;
