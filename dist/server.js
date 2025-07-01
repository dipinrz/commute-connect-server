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
const app_1 = __importDefault(require("./app"));
const database_config_1 = require("./config/database.config");
require("dotenv/config");
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
// Initialize database connection before starting server
function initializeServer() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            console.log("🔍 ENV DB Config:", {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: ((_a = process.env.DB_PASSWORD) === null || _a === void 0 ? void 0 : _a.slice(0, 4)) + '***',
                db: process.env.DB_NAME,
            });
            yield database_config_1.AppDataSource.initialize();
            console.log('Database connected successfully');
            app_1.default.listen(PORT, HOST, () => {
                console.log(`Server running on http://${HOST}:${PORT}`);
                console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
            });
        }
        catch (error) {
            console.error('Failed to initialize server:', error);
            process.exit(1);
        }
    });
}
initializeServer();
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    // Close server and exit process
    process.exit(1);
});
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    process.exit(1);
});
