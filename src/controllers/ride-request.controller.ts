import { Request, Response } from "express";
import { RideRequestService } from "../services/ride-request.service";
import { RequestStatus } from "../entities/ride-request.entity";

const rideRequestService = new RideRequestService();

// export const createRideRequest = async (req: any, res: any) => {
//   try {
//     const rideRequest = await rideRequestService.createRideRequest({
//       passengerId: req.user.id,
//       rideId: req.body.rideId,
//       trainNumber: req.body.trainNumber,
//       arrivalTime: new Date(req.body.arrivalTime),
//       fromStation: req.body.fromStation,
//       toLocation: req.body.toLocation,
//       maxWaitTime: parseInt(req.body.maxWaitTime),
//       notes: req.body.notes,
//       pickupLocation: req.body.pickupLocation || req.body.fromStation,
//       dropoffLocation: req.body.dropoffLocation || req.body.toLocation
//     });
//     res.status(201).json(rideRequest);
//   } catch (error:any) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const createRideRequest = async (req: any, res: Response) => {
  try {
    const {
      rideId,
      trainNumber,
      arrivalTime,
      fromStation,
      toLocation,
      maxWaitTime,
      pickupLocation,
      dropoffLocation,
      notes,
    } = req.body;

    const rideRequest = await rideRequestService.createRideRequest({
      passengerId: req.user.id,
      trainNumber,
      arrivalTime: new Date(arrivalTime),
      fromStation,
      toLocation,
      maxWaitTime: parseInt(maxWaitTime),
      pickupLocation: pickupLocation || fromStation,
      dropoffLocation: dropoffLocation || toLocation,
      notes,
    });

    res.status(201).json(rideRequest);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getRideRequest = async (req: any, res: any) => {
  try {
    const rideRequest = await rideRequestService.getRideRequestById(
      req.params.id
    );

    // Verify the requesting user is either passenger or driver
    if (
      rideRequest.passenger.id !== req.user.id &&
      rideRequest.ride.driver.id !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(rideRequest);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateRequestStatus = async (req: any, res: any) => {
  try {
    const rideRequest = await rideRequestService.updateRideRequestStatus(
      req.params.id,
      req.body.status as RequestStatus,
      req.user.id
    );
    res.json(rideRequest);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyRideRequests = async (req: any, res: any) => {
  try {
    const rideRequests = await rideRequestService.getPassengerRequests(
      req.user.id
    );
    res.json(rideRequests);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getRideRequestsForRide = async (req: any, res: any) => {
  try {
    const rideRequests = await rideRequestService.getRideRequests(
      req.params.rideId,
      req.user.id
    );
    res.json(rideRequests);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelRideRequest = async (req: any, res: any) => {
  try {
    const rideRequest = await rideRequestService.cancelRideRequest(
      req.params.id,
      req.user.id
    );
    res.json(rideRequest);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const confirmRideMatch = async (req: any, res: Response) => {
  const requestId = req.params.requestId;
  const { rideId } = req.body;

  console.log(requestId,rideId,req.body);
  
  const userId = req.user.id; // assuming auth middleware sets this

  try {
    const updated = await rideRequestService.confirmMatch(
      requestId,
      rideId,
      userId
    );
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
