"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const typeorm_1 = require("typeorm");
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof typeorm_1.QueryFailedError) {
        return res.status(500).json({
            success: false,
            error: 'Database operation failed'
        });
    }
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
};
exports.errorMiddleware = errorMiddleware;
