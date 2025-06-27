// src/controllers/buildings.controller.ts
import { Request, Response } from "express";
import { BuildingsService } from "../services/buildings.service";
import { CreateBuildingData } from "../types/buildings.types";

export class BuildingsController {
  private buildingsService: BuildingsService;

  constructor() {
    this.buildingsService = new BuildingsService();
  }

  createBuilding = async (req: any, res: any) => {
    try {
      const buildingData: CreateBuildingData = req.body;
      const building = await this.buildingsService.createBuilding(buildingData);
      res.status(201).json({
        success: true,
        data: building
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getAllBuildings = async (req: any, res: any) => {
    try {
      const buildings = await this.buildingsService.getAllBuildings();
      res.status(200).json({
        success: true,
        data: buildings
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getBuildingDetails = async (req: any, res: any) => {
    try {
      const building = await this.buildingsService.getBuildingById(req.params.id);
      
      if (!building) {
        return res.status(404).json({
          success: false,
          error: 'Building not found'
        });
      }

      res.status(200).json({
        success: true,
        data: building
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  updateBuilding = async (req: any, res: any) => {
    try {
      const building = await this.buildingsService.updateBuilding(req.params.id, req.body);
      
      if (!building) {
        return res.status(404).json({
          success: false,
          error: 'Building not found'
        });
      }

      res.status(200).json({
        success: true,
        data: building
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  searchBuildings = async (req: any, res: any) => {
    try {
      const query = req.query.q as string;
      
      if (!query || query.length < 3) {
        return res.status(400).json({
          success: false,
          error: 'Search query must be at least 3 characters'
        });
      }

      const buildings = await this.buildingsService.searchBuildings(query);
      res.status(200).json({
        success: true,
        data: buildings
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  private handleError(res: any, error: unknown) {
    const message = error instanceof Error ? error.message : 'Building operation failed';
    res.status(400).json({
      success: false,
      error: message
    });
  }
}