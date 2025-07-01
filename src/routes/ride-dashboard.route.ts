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


import { Router } from "express";
import {
  createRideRequest,
  getRideRequest,
  updateRequestStatus,
  getMyRideRequests,
  getRideRequestsForRide,
  cancelRideRequest,
} from "../controllers/ride-request.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createRideRequestSchema,
  updateRideRequestStatusSchema,
} from "../validations/ride-request.validation";

const router = Router();
router.use(authMiddleware);

router.post("/", validate(createRideRequestSchema), createRideRequest);
router.get("/:id", getRideRequest);
router.patch(
  "/:id/status",
  validate(updateRideRequestStatusSchema),
  updateRequestStatus
);
router.get("/passenger/me", getMyRideRequests);
router.get("/ride/:rideId", getRideRequestsForRide);
router.patch("/:id/cancel", cancelRideRequest);

export default router;
