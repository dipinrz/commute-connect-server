"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = require("express-rate-limit");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const rides_routes_1 = __importDefault(require("./routes/rides.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const buildings_routes_1 = __importDefault(require("./routes/buildings.routes"));
const ride_request_routes_1 = __importDefault(require("./routes/ride-request.routes"));
const messages_routes_1 = __importDefault(require("./routes/messages.routes"));
const notFound_middleware_1 = require("./middlewares/notFound.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const database_config_1 = require("./config/database.config");
require("dotenv/config");
const app = (0, express_1.default)();
// Rate limiting
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
// Middleware
app.use((0, cors_1.default)({ origin: '*', credentials: true }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(limiter);
// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        database: database_config_1.AppDataSource.isInitialized ? 'connected' : 'disconnected',
    });
});
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/rides', rides_routes_1.default);
app.use('/api/users', users_routes_1.default);
app.use('/api/buildings', buildings_routes_1.default);
app.use('/api/messages', messages_routes_1.default);
app.use('/api/ride-request', ride_request_routes_1.default);
// Error handling
app.use(notFound_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
