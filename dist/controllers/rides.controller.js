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
exports.RidesController = void 0;
const rides_service_1 = require("../services/rides.service");
class RidesController {
    constructor() {
        this.createRide = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const rideData = Object.assign(Object.assign({}, req.body), { driver: user });
                const ride = yield this.ridesService.createRide(rideData);
                res.status(201).json({
                    success: true,
                    data: ride,
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.getAvailableRides = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    workBuilding: req.query.workBuilding,
                    departureTime: req.query.departureTime
                        ? new Date(req.query.departureTime)
                        : undefined,
                    limit: req.query.limit
                        ? parseInt(req.query.limit)
                        : undefined,
                };
                const rides = yield this.ridesService.findRides(params);
                res.status(200).json({
                    success: true,
                    data: rides,
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.getRideDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ride = yield this.ridesService.findRideById(req.params.id);
                if (!ride) {
                    return res.status(404).json({
                        success: false,
                        error: "Ride not found",
                    });
                }
                res.status(200).json({
                    success: true,
                    data: ride,
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.updateRideStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status } = req.body;
                if (!["active", "completed", "cancelled"].includes(status)) {
                    return res.status(400).json({
                        success: false,
                        error: "Invalid status",
                    });
                }
                const ride = yield this.ridesService.updateRideStatus(id, status);
                if (!ride) {
                    return res.status(404).json({
                        success: false,
                        error: "Ride not found",
                    });
                }
                res.status(200).json({
                    success: true,
                    data: ride,
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.ridesService = new rides_service_1.RidesService();
    }
    handleError(res, error) {
        const message = error instanceof Error ? error.message : "Ride operation failed";
        res.status(400).json({
            success: false,
            error: message,
        });
    }
}
exports.RidesController = RidesController;
