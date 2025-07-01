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
exports.Ride = exports.RideStatus = void 0;
// src/entities/ride.entity.ts
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
const ride_request_entity_1 = require("./ride-request.entity");
var RideStatus;
(function (RideStatus) {
    RideStatus["PENDING"] = "pending";
    RideStatus["ACTIVE"] = "active";
    RideStatus["COMPLETED"] = "completed";
    RideStatus["CANCELLED"] = "cancelled";
})(RideStatus || (exports.RideStatus = RideStatus = {}));
let Ride = class Ride extends base_entity_1.BaseEntity {
};
exports.Ride = Ride;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.rides),
    (0, typeorm_1.JoinColumn)({ name: "driver_id" }),
    __metadata("design:type", user_entity_1.User)
], Ride.prototype, "driver", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "train_number", length: 50 }),
    __metadata("design:type", String)
], Ride.prototype, "trainNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "departure_station", length: 100 }),
    __metadata("design:type", String)
], Ride.prototype, "departureStation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "arrival_station", length: 100 }),
    __metadata("design:type", String)
], Ride.prototype, "arrivalStation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "departure_time", type: "timestamptz" }),
    __metadata("design:type", Date)
], Ride.prototype, "departureTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "available_seats" }),
    __metadata("design:type", Number)
], Ride.prototype, "availableSeats", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "vehicle_information" }),
    __metadata("design:type", String)
], Ride.prototype, "vehicleInformation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "route_details", nullable: true }),
    __metadata("design:type", String)
], Ride.prototype, "routeDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "additional_details", nullable: true }),
    __metadata("design:type", String)
], Ride.prototype, "additionalDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: RideStatus,
        default: RideStatus.PENDING,
    }),
    __metadata("design:type", String)
], Ride.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], Ride.prototype, "route", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ride_request_entity_1.RideRequest, (request) => request.ride),
    __metadata("design:type", Array)
], Ride.prototype, "requests", void 0);
exports.Ride = Ride = __decorate([
    (0, typeorm_1.Entity)("rides")
], Ride);
