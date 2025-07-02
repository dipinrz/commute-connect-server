import { Router } from 'express';
import { getMatchingRides } from '../controllers/match.controller';

const router = Router();

// GET /api/match-rides?requestId=abc123
router.get('/', getMatchingRides);
// router.get('/', (req:any,res:any)=>{
//   res.json({data:req.query})
// });

export default router;