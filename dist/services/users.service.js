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
exports.UsersService = void 0;
const database_config_1 = require("../config/database.config");
const user_entity_1 = require("../entities/user.entity");
const ride_entity_1 = require("../entities/ride.entity");
const rides_types_1 = require("../types/rides.types");
class UsersService {
    constructor() {
        this.userRepository = database_config_1.AppDataSource.getRepository(user_entity_1.User);
        this.rideRepository = database_config_1.AppDataSource.getRepository(ride_entity_1.Ride);
    }
    getUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId },
                select: ['id', 'name', 'email', 'workBuilding', 'company', 'avatar', 'rating', 'isDriver', 'vehicleInfo']
            });
            if (!user) {
                throw new Error('User not found');
            }
            const [upcomingRides, pastRides] = yield Promise.all([
                this.rideRepository.find({
                    where: { driver: { id: userId }, status: rides_types_1.RideStatus.PENDING },
                    relations: ['driver']
                }),
                this.rideRepository.find({
                    where: { driver: { id: userId }, status: rides_types_1.RideStatus.COMPLETED },
                    relations: ['driver']
                })
            ]);
            return Object.assign(Object.assign({}, user), { upcomingRides,
                pastRides });
        });
    }
    updateUser(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.update(userId, updateData);
            const updatedUser = yield this.userRepository.findOne({
                where: { id: userId },
                select: ['id', 'name', 'email', 'workBuilding', 'company', 'avatar', 'rating', 'isDriver', 'vehicleInfo']
            });
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        });
    }
    getUsersByBuilding(building) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find({
                where: { workBuilding: building },
                select: ['id', 'name', 'email', 'workBuilding', 'company', 'avatar', 'rating']
            });
        });
    }
}
exports.UsersService = UsersService;
