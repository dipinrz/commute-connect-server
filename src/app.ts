import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppDataSource } from './config/database.config';
import authRoutes from './routes/auth.routes';
import ridesRoutes from './routes/rides.routes';
import usersRoutes from './routes/users.routes';
import buildingsRoutes from './routes/buildings.routes';
import rideRequestRouts from './routes/ride-request.routes'
import messagesRoutes from './routes/messages.routes';
import { rateLimit } from 'express-rate-limit';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

// Initialize database connection
AppDataSource.initialize()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection error:', error));

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: AppDataSource.isInitialized ? 'connected' : 'disconnected'
  });
});

// API Routes
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