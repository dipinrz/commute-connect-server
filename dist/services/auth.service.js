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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_config_1 = require("../config/database.config");
const user_entity_1 = require("../entities/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor() {
        this.userRepository = database_config_1.AppDataSource.getRepository(user_entity_1.User);
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if user already exists
            const existingUser = yield this.userRepository.findOne({
                where: { email: userData.email },
            });
            if (existingUser) {
                throw new Error("Email already in use");
            }
            // Hash password
            const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 12);
            // Create user
            const user = this.userRepository.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
            yield this.userRepository.save(user);
            // Generate JWT token
            const token = this.generateToken(user);
            return { user, token };
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { email: credentials.email },
            });
            if (!user) {
                throw new Error("Invalid credentials");
            }
            // Verify password
            const isPasswordValid = yield bcryptjs_1.default.compare(credentials.password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid credentials");
            }
            // Generate JWT token
            const token = this.generateToken(user);
            return { user, token };
        });
    }
    generateToken(user) {
        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
        const issuer = process.env.JWT_ISSUER || "commute-connect";
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const payload = {
            id: user.id,
            email: user.email,
        };
        const options = {
            expiresIn,
            issuer,
        };
        const token = jsonwebtoken_1.default.sign(payload, secret, options);
        return token;
    }
    validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                return yield this.userRepository.findOne({
                    where: { id: decoded.id },
                    select: [
                        "id",
                        "name",
                        "email",
                        "workBuilding",
                        "company",
                        "avatar",
                        "rating",
                    ],
                });
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.AuthService = AuthService;
