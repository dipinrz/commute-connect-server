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
exports.adminMiddleware = void 0;
const user_entity_1 = require("../entities/user.entity");
const database_config_1 = require("../config/database.config");
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = database_config_1.AppDataSource.getRepository(user_entity_1.User);
        const user = yield userRepository.findOne({
            where: { id: req.user.id },
            select: ['isAdmin']
        });
        if (!(user === null || user === void 0 ? void 0 : user.isAdmin)) {
            return res.status(403).json({
                success: false,
                error: 'Access denied. Admin privileges required.'
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to verify admin status'
        });
    }
});
exports.adminMiddleware = adminMiddleware;
