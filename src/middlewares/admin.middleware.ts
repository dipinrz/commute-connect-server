// src/middlewares/admin.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../config/database.config';

export const adminMiddleware = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user:any = await userRepository.findOne({
      where: { id: req.user.id },
      select: ['isAdmin']
    });

    if (!user?.isAdmin) {
      return res.status(403).json({
        success: false,
        error: 'Access denied. Admin privileges required.'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to verify admin status'
    });
  }
};