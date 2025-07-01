"use strict";
// // Get matching offers for a request
// router.get('/ride-requests/:id/matching-offers', authenticate, async (req, res) => {
//   try {
//     const request = await rideRequestService.getRideRequestById(req.params.id);
//     const offers = await rideService.findMatchingOffers(request);
//     res.json(offers);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
Object.defineProperty(exports, "__esModule", { value: true });
// // Get matching requests for an offer
// router.get('/rides/:id/matching-requests', authenticate, async (req, res) => {
//   try {
//     const offer = await rideService.getRideById(req.params.id);
//     const requests = await rideRequestService.findMatchingRequests(offer);
//     res.json(requests);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
// // Update request status
// router.patch('/ride-requests/:id/status', authenticate, async (req, res) => {
//   try {
//     const request = await rideRequestService.updateRideRequestStatus(
//       req.params.id,
//       req.body.status,
//       req.user.id
//     );
//     // Send notification to passenger
//     await notificationService.createNotification({
//       userId: request.passenger.id,
//       title: 'Ride Request Updated',
//       message: `Your request has been ${req.body.status}`,
//       type: 'ride-status'
//     });
//     res.json(request);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
const express_1 = require("express");
const ride_request_controller_1 = require("../controllers/ride-request.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const ride_request_validation_1 = require("../validations/ride-request.validation");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post("/", (0, validation_middleware_1.validate)(ride_request_validation_1.createRideRequestSchema), ride_request_controller_1.createRideRequest);
router.get("/:id", ride_request_controller_1.getRideRequest);
router.patch("/:id/status", (0, validation_middleware_1.validate)(ride_request_validation_1.updateRideRequestStatusSchema), ride_request_controller_1.updateRequestStatus);
router.get("/passenger/me", ride_request_controller_1.getMyRideRequests);
router.get("/ride/:rideId", ride_request_controller_1.getRideRequestsForRide);
router.patch("/:id/cancel", ride_request_controller_1.cancelRideRequest);
exports.default = router;
