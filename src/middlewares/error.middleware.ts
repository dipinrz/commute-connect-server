// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { QueryFailedError } from 'typeorm';

export const errorMiddleware = (
  err: any,
  req: any,
  res: any,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof QueryFailedError) {
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