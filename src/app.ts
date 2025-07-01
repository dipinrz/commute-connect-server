import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';

import authRoutes from './routes/auth.routes';
import ridesRoutes from './routes/rides.routes';
import usersRoutes from './routes/users.routes';
import buildingsRoutes from './routes/buildings.routes';
import rideRequestRouts from './routes/ride-request.routes'
import messagesRoutes from './routes/messages.routes';

import { notFoundHandler } from './middlewares/notFound.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { AppDataSource } from './config/database.config';
import 'dotenv/config';

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: AppDataSource.isInitialized ? 'connected' : 'disconnected',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', ridesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/buildings', buildingsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/ride-request', rideRequestRouts);


// Error handling
app.use(notFoundHandler);
app.use(errorMiddleware);

export default app;
