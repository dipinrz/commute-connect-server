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
exports.BuildingsController = void 0;
const buildings_service_1 = require("../services/buildings.service");
class BuildingsController {
    constructor() {
        this.createBuilding = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const buildingData = req.body;
                const building = yield this.buildingsService.createBuilding(buildingData);
                res.status(201).json({
                    success: true,
                    data: building
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.getAllBuildings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const buildings = yield this.buildingsService.getAllBuildings();
                res.status(200).json({
                    success: true,
                    data: buildings
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.getBuildingDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const building = yield this.buildingsService.getBuildingById(req.params.id);
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
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.updateBuilding = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const building = yield this.buildingsService.updateBuilding(req.params.id, req.body);
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
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.searchBuildings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query.q;
                if (!query || query.length < 3) {
                    return res.status(400).json({
                        success: false,
                        error: 'Search query must be at least 3 characters'
                    });
                }
                const buildings = yield this.buildingsService.searchBuildings(query);
                res.status(200).json({
                    success: true,
                    data: buildings
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.buildingsService = new buildings_service_1.BuildingsService();
    }
    handleError(res, error) {
        const message = error instanceof Error ? error.message : 'Building operation failed';
        res.status(400).json({
            success: false,
            error: message
        });
    }
}
exports.BuildingsController = BuildingsController;
