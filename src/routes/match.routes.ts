import { Router } from 'express';
import { getMatchingRides } from '../controllers/match.controller';

const router = Router();

// GET /api/match-rides?requestId=abc123
router.get('/', getMatchingRides);

export default router;