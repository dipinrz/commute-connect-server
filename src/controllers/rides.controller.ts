// src/controllers/rides.controller.ts
import { Request, Response } from "express";
import { RidesService } from "../services/rides.service";
import { CreateRideData, FindRidesParams } from "../types/rides.types";
import { authMiddleware } from "../middlewares/auth.middleware";

export class RidesController {
  private ridesService: RidesService;

  constructor() {
    this.ridesService = new RidesService();
  }

  createRide = async (req: any, res: any) => {
    try {
      console.log("call hit ==========");

      const user = req.user;
      const rideData: CreateRideData = {
        ...req.body,
        driver: user,
      };

      const ride = await this.ridesService.createRide(rideData);
      res.status(201).json({
        success: true,
        data: ride,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getAvailableRides = async (req: any, res: any) => {
    try {
      const params: FindRidesParams = {
        workBuilding: req.query.workBuilding as string,
        departureTime: req.query.departureTime
          ? new Date(req.query.departureTime as string)
          : undefined,
        limit: req.query.limit
          ? parseInt(req.query.limit as string)
          : undefined,
      };

      const rides = await this.ridesService.findRides(params);
      res.status(200).json({
        success: true,
        data: rides,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getUserRides = async (req: any, res: any) => {
    try {
      const params: any = {
        userId: req.user.id,
        status: req.query.status as
          | "active"
          | "completed"
          | "cancelled"
          | undefined,
        limit: req.query.limit
          ? parseInt(req.query.limit as string)
          : undefined,
      };

      const rides = await this.ridesService.findUserRides(params);
      res.status(200).json({
        success: true,
        data: rides,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getRideDetails = async (req: any, res: any) => {
    try {
      const ride = await this.ridesService.findRideById(req.params.id);

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
    } catch (error) {
      this.handleError(res, error);
    }
  };

  updateRideStatus = async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["active", "completed", "cancelled"].includes(status)) {
        return res.status(400).json({
          success: false,
          error: "Invalid status",
        });
      }

      const ride = await this.ridesService.updateRideStatus(id, status as any);

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
    } catch (error) {
      this.handleError(res, error);
    }
  };

  private handleError(res: any, error: unknown) {
    const message =
      error instanceof Error ? error.message : "Ride operation failed";
    res.status(400).json({
      success: false,
      error: message,
    });
  }

  cancelRideOffer = async (req: any, res: any) => {
    try {
      const ride = await this.ridesService.cancelRideOffer(
        req.params.id,
        req.user.id
      );

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
    } catch (error) {
      this.handleError(res, error);
    }
  };

  confirmRideOfferMatch = async (req: any, res: Response) => {
    try {
      const { rideId } = req.params;
      const { requestId } = req.body;
      const userId = req.user.id; // driver ID

      const result = await this.ridesService.confirmRideOffer(
        rideId,
        requestId,
        userId
      );
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
