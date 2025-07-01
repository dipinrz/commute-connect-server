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
exports.UsersController = void 0;
const users_service_1 = require("../services/users.service");
class UsersController {
    constructor() {
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.usersService.getUserProfile(req.user.id);
                res.status(200).json({
                    success: true,
                    data: profile
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.updateProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield this.usersService.updateUser(req.user.id, req.body);
                res.status(200).json({
                    success: true,
                    data: updatedUser
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.getBuildingUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.usersService.getUsersByBuilding(req.params.building);
                res.status(200).json({
                    success: true,
                    data: users
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.usersService = new users_service_1.UsersService();
    }
    handleError(res, error) {
        const message = error instanceof Error ? error.message : 'User operation failed';
        const status = message === 'User not found' ? 404 : 400;
        res.status(status).json({
            success: false,
            error: message
        });
    }
}
exports.UsersController = UsersController;
