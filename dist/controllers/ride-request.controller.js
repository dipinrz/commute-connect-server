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
exports.cancelRideRequest = exports.getRideRequestsForRide = exports.getMyRideRequests = exports.updateRequestStatus = exports.getRideRequest = exports.createRideRequest = void 0;
const ride_request_service_1 = require("../services/ride-request.service");
const rideRequestService = new ride_request_service_1.RideRequestService();
const createRideRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rideRequest = yield rideRequestService.createRideRequest({
            passengerId: req.user.id,
            rideId: req.body.rideId,
            trainNumber: req.body.trainNumber,
            arrivalTime: new Date(req.body.arrivalTime),
            fromStation: req.body.fromStation,
            toLocation: req.body.toLocation,
            maxWaitTime: parseInt(req.body.maxWaitTime),
            notes: req.body.notes,
            pickupLocation: req.body.pickupLocation || req.body.fromStation,
            dropoffLocation: req.body.dropoffLocation || req.body.toLocation
        });
        res.status(201).json(rideRequest);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createRideRequest = createRideRequest;
const getRideRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rideRequest = yield rideRequestService.getRideRequestById(req.params.id);
        // Verify the requesting user is either passenger or driver
        if (rideRequest.passenger.id !== req.user.id &&
            rideRequest.ride.driver.id !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        res.json(rideRequest);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getRideRequest = getRideRequest;
const updateRequestStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rideRequest = yield rideRequestService.updateRideRequestStatus(req.params.id, req.body.status, req.user.id);
        res.json(rideRequest);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateRequestStatus = updateRequestStatus;
const getMyRideRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rideRequests = yield rideRequestService.getPassengerRequests(req.user.id);
        res.json(rideRequests);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getMyRideRequests = getMyRideRequests;
const getRideRequestsForRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rideRequests = yield rideRequestService.getRideRequests(req.params.rideId, req.user.id);
        res.json(rideRequests);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getRideRequestsForRide = getRideRequestsForRide;
const cancelRideRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rideRequest = yield rideRequestService.cancelRideRequest(req.params.id, req.user.id);
        res.json(rideRequest);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.cancelRideRequest = cancelRideRequest;
