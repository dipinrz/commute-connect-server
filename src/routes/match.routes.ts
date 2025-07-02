import { Router } from 'express';
import { getMatchingRequests, getMatchingRides } from '../controllers/match.controller';

const router = Router();

// GET /api/match-rides?requestId=abc123

router.get('/match-rides', getMatchingRides);       // requestId → rides
router.get('/match-requests', getMatchingRequests); // rideId → requests
export default router;