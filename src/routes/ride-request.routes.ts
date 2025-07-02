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
