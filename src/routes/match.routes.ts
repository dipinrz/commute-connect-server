import { Router } from 'express';
import { getMatchingRequests, getMatchingRides } from '../controllers/match.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
router.use(authMiddleware);

// GET /api/match-rides?requestId=abc123

router.get('/match-rides', getMatchingRides);       // requestId → rides
router.get('/match-requests', getMatchingRequests); // rideId → requests
export default router;