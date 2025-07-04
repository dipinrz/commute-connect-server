"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideRequest = exports.RequestStatus = void 0;
// src/entities/ride-request.entity.ts
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
const ride_entity_1 = require("./ride.entity");
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["PENDING"] = "pending";
    RequestStatus["ACCEPTED"] = "accepted";
    RequestStatus["REJECTED"] = "rejected";
    RequestStatus["CANCELLED"] = "cancelled";
    RequestStatus["COMPLETED"] = "completed";
})(RequestStatus || (exports.RequestStatus = RequestStatus = {}));
let RideRequest = class RideRequest extends base_entity_1.BaseEntity {
};
exports.RideRequest = RideRequest;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.rideRequests),
    (0, typeorm_1.JoinColumn)({ name: 'passenger_id' }),
    __metadata("design:type", user_entity_1.User)
], RideRequest.prototype, "passenger", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ride_entity_1.Ride, (ride) => ride.requests),
    (0, typeorm_1.JoinColumn)({ name: 'ride_id' }),
    __metadata("design:type", ride_entity_1.Ride)
], RideRequest.prototype, "ride", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RequestStatus,
        default: RequestStatus.PENDING
    }),
    __metadata("design:type", String)
], RideRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'train_number', length: 50 }),
    __metadata("design:type", String)
], RideRequest.prototype, "trainNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'arrival_time' }),
    __metadata("design:type", Date)
], RideRequest.prototype, "arrivalTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'from_station', length: 100 }),
    __metadata("design:type", String)
], RideRequest.prototype, "fromStation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'to_location', length: 100 }),
    __metadata("design:type", String)
], RideRequest.prototype, "toLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_wait_time', type: 'smallint' }),
    __metadata("design:type", Number)
], RideRequest.prototype, "maxWaitTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], RideRequest.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pickup_location', length: 255 }),
    __metadata("design:type", String)
], RideRequest.prototype, "pickupLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dropoff_location', length: 255 }),
    __metadata("design:type", String)
], RideRequest.prototype, "dropoffLocation", void 0);
exports.RideRequest = RideRequest = __decorate([
    (0, typeorm_1.Entity)('ride_requests')
], RideRequest);
