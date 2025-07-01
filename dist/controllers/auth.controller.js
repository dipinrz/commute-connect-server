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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const { user, token } = yield this.authService.register(userData);
                // Omit password before sending any
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                res.status(201).json({
                    success: true,
                    data: { user: userWithoutPassword, token },
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const credentials = req.body;
                const { user, token } = yield this.authService.login(credentials);
                // Omit password before sending any
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                res.status(200).json({
                    success: true,
                    data: { user: userWithoutPassword, token },
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.me = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // The user is attached to the any by the auth middleware
                const user = req.user;
                res.status(200).json({
                    success: true,
                    data: user,
                });
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.authService = new auth_service_1.AuthService();
    }
    handleError(res, error) {
        const message = error instanceof Error ? error.message : 'Authentication failed';
        res.status(400).json({
            success: false,
            error: message,
        });
    }
}
exports.AuthController = AuthController;
