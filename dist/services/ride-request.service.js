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
exports.RideRequestService = void 0;
const database_config_1 = require("../config/database.config");
const ride_request_entity_1 = require("../entities/ride-request.entity");
const user_entity_1 = require("../entities/user.entity");
const ride_entity_1 = require("../entities/ride.entity");
const ride_request_entity_2 = require("../entities/ride-request.entity");
class RideRequestService {
    constructor() {
        this.rideRequestRepository = database_config_1.AppDataSource.getRepository(ride_request_entity_1.RideRequest);
        this.userRepository = database_config_1.AppDataSource.getRepository(user_entity_1.User);
        this.rideRepository = database_config_1.AppDataSource.getRepository(ride_entity_1.Ride);
    }
    createRideRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const passenger = yield this.userRepository.findOneBy({ id: data.passengerId });
            if (!passenger)
                throw new Error('Passenger not found');
            const ride = yield this.rideRepository.findOneBy({ id: data.rideId });
            if (!ride)
                throw new Error('Ride not found');
            // Check if passenger is already requesting this ride
            const existingRequest = yield this.rideRequestRepository.findOne({
                where: {
                    passenger: { id: data.passengerId },
                    ride: { id: data.rideId }
                }
            });
            if (existingRequest) {
                throw new Error('You have already requested this ride');
            }
            const rideRequest = this.rideRequestRepository.create({
                passenger,
                ride,
                trainNumber: data.trainNumber,
                arrivalTime: data.arrivalTime,
                fromStation: data.fromStation,
                toLocation: data.toLocation,
                maxWaitTime: data.maxWaitTime,
                notes: data.notes,
                pickupLocation: data.pickupLocation,
                dropoffLocation: data.dropoffLocation,
                status: ride_request_entity_2.RequestStatus.PENDING
            });
            return yield this.rideRequestRepository.save(rideRequest);
        });
    }
    getRideRequestById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rideRequest = yield this.rideRequestRepository.findOne({
                where: { id },
                relations: ['passenger', 'ride', 'ride.driver']
            });
            if (!rideRequest)
                throw new Error('Ride request not found');
            return rideRequest;
        });
    }
    updateRideRequestStatus(id, status, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rideRequest = yield this.rideRequestRepository.findOne({
                where: { id },
                relations: ['ride', 'ride.driver']
            });
            if (!rideRequest)
                throw new Error('Ride request not found');
            // Only driver can accept/reject requests
            if (rideRequest.ride.driver.id !== userId) {
                throw new Error('Only the ride driver can update request status');
            }
            rideRequest.status = status;
            return yield this.rideRequestRepository.save(rideRequest);
        });
    }
    getPassengerRequests(passengerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.rideRequestRepository.find({
                where: { passenger: { id: passengerId } },
                relations: ['ride', 'ride.driver'],
                order: { createdAt: 'DESC' }
            });
        });
    }
    getRideRequests(rideId, driverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ride = yield this.rideRepository.findOne({
                where: { id: rideId },
                relations: ['driver']
            });
            if (!ride)
                throw new Error('Ride not found');
            if (ride.driver.id !== driverId)
                throw new Error('Not authorized');
            return yield this.rideRequestRepository.find({
                where: { ride: { id: rideId } },
                relations: ['passenger'],
                order: { createdAt: 'DESC' }
            });
        });
    }
    cancelRideRequest(id, passengerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rideRequest = yield this.rideRequestRepository.findOne({
                where: { id },
                relations: ['passenger']
            });
            if (!rideRequest)
                throw new Error('Ride request not found');
            if (rideRequest.passenger.id !== passengerId) {
                throw new Error('Only the passenger can cancel this request');
            }
            rideRequest.status = ride_request_entity_2.RequestStatus.CANCELLED;
            return yield this.rideRequestRepository.save(rideRequest);
        });
    }
}
exports.RideRequestService = RideRequestService;
